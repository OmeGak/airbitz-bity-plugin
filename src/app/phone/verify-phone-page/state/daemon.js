import { take, put, spawn, race, call, select } from 'redux-saga/effects';

import * as actions from './actions';
import * as selectors from './selectors';
import * as notificationActions from '../../../notifications/actions';

import {
  data as phoneDataStore,
  load as loadPhoneOp,
  verify as verifyPhoneOp,
  sendVerificationCode as sendVerificationCodeOp
} from '../../../common-data/phone';

export default function verifyPhonePageDaemonFactory() {
  return function* runRVerifyPhonePageDaemon() {
    yield [
      yield spawn(preparePage),
      yield spawn(listenVerifyPhoneIntents),
      yield spawn(listenResendCodeIntents)
    ];
  };
}

// --------------------------
// prepare page
// --------------------------
function* preparePage() {
  while (true) { // eslint-disable-line no-constant-condition
    const { payload: { router } } = yield take(actions.MOUNTED);

    yield put(actions.preparationStarted());

    const stepResult = yield call(preloadPhoneStep, router);
    if (stepResult.skipNextSteps) {
      continue; // eslint-disable-line no-continue
    }

    yield put(actions.preparationCompleted());
  }
}

function* preloadPhoneStep(router) {
  yield put(loadPhoneOp.actions.load());

  const res = yield race({
    unmounted: take(actions.UNMOUNTED),
    canceled: take(loadPhoneOp.actions.CANCELED),
    failed: take(loadPhoneOp.actions.FAILED),
    succeed: take(loadPhoneOp.actions.SUCCEED),
    cached: take(loadPhoneOp.actions.CACHED)
  });

  if (res.unmounted || res.canceled) {
    return {
      skipNextSteps: true
    };
  }

  if (res.failed) {
    yield put(actions.preparationFailed());
    return {
      skipNextSteps: true
    };
  }

  const hasPhone = yield select(phoneDataStore.selectors.hasData);
  if (!hasPhone) {
    gotoRegisterPhonePage(router);
    return {
      skipNextSteps: true
    };
  }

  const phone = yield select(phoneDataStore.selectors.getData);
  if (phone.isVerified) {
    gotoRoot(router);
    return {
      skipNextSteps: true
    };
  }

  return {
    skipNextSteps: false
  };
}

// --------------------------
// verify phone
// --------------------------
function* listenVerifyPhoneIntents() {
  while (true) { // eslint-disable-line no-constant-condition
    const { payload: { code, router } } = yield take(actions.VERIFY);

    const { cli: phoneNumber } = yield select(phoneDataStore.selectors.getData);

    yield put(verifyPhoneOp.actions.verify(code, phoneNumber));

    const res = yield race({
      succeed: take(verifyPhoneOp.actions.SUCCEED),
      failed: take(verifyPhoneOp.actions.FAILED),
      canceled: take(verifyPhoneOp.actions.CANCELED)
    });

    const isMounted = yield select(selectors.isMounted);
    if (!res.succeed || !isMounted) {
      continue; // eslint-disable-line no-continue
    }

    yield put(notificationActions.notify({
      title: 'Success',
      msg: `The phone number ${phoneNumber} has been confirmed`
    }));

    onSuccessfulVerificationOfPhone(router);
  }
}

// --------------------------
// resend code
// --------------------------
function* listenResendCodeIntents() {
  while (true) { // eslint-disable-line no-constant-condition
    const { payload: { router } } = yield take(actions.RESEND_CODE);

    const phone = yield select(phoneDataStore.selectors.getData);

    yield put(sendVerificationCodeOp.actions.send(phone.cli));

    const res = yield race({
      succeed: take(sendVerificationCodeOp.actions.SUCCEED),
      failed: take(sendVerificationCodeOp.actions.FAILED),
      canceled: take(sendVerificationCodeOp.actions.CANCELED)
    });

    const isMounted = yield select(selectors.isMounted);
    if (res.canceled || res.succeed || !isMounted) {
      continue; // eslint-disable-line no-continue
    }

    const { payload: { code } } = res.failed;
    // This occurs when user requests verification code for the phone number which was verified already.
    // The most user-friendly behaviour is perform the actions that are performed
    // upon successful verification of the phone number.
    if (code === 'already_verified') {
      onSuccessfulVerificationOfPhone(router);
    }
  }
}

function onSuccessfulVerificationOfPhone(router) {
  gotoRoot(router);
}

// --------------------------
// routing
// --------------------------
function gotoRegisterPhonePage(router) {
  router.replace('phone/register');
}

function gotoRoot(router) {
  router.replace('/');
}
