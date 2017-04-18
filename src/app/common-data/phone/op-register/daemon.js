import { take, put, spawn, call, race } from 'redux-saga/effects';
import * as actions from './actions';
import { actions as dataActions } from '../data';
import { actions as sendVerificationCodeActions } from '../op-send-verification-code';
import { actions as authActions } from '../../auth';
import * as notificationActions from '../../../notifications/actions';

export default function registerPhoneDaemonFactory(bity) {
  return function* runRegisterPhoneDaemon() {
    return yield [
      yield spawn(listenIntents, bity)
    ];
  };
}

function* listenIntents(bity) {
  while (true) { // eslint-disable-line no-constant-condition
    const { payload: { phoneNumber, userId } } = yield take(actions.REGISTER);

    yield put(actions.started());

    let stepResult;

    stepResult = yield call(registerPhoneStep, bity, phoneNumber, userId);
    if (stepResult.skipNextSteps) {
      continue; // eslint-disable-line no-continue
    }

    stepResult = yield call(sendVerificationCodeStep, phoneNumber);
    if (stepResult.skipNextSteps) {
      continue; // eslint-disable-line no-continue
    }

    yield put(dataActions.outdated());
    yield put(actions.succeed());
  }
}

// --------------------------
// register phone step
// --------------------------
function* registerPhoneStep(bity, phoneNumber, userId) {
  const res = yield race({
    unauth: take(authActions.UNAUTHENTICATED),
    requestResult: call(sendRegisterPhoneRequest, bity, phoneNumber, userId)
  });

  if (res.unauth) {
    yield put(actions.canceled());
    return {
      skipNextSteps: true
    };
  }

  const { error } = res.requestResult;
  if (error) {
    yield put(notificationActions.notify({
      title: 'Error',
      msg: `Can't register phone number ${phoneNumber}.\n${error.message}`
    }));
    yield put(actions.failed(error));
    return {
      skipNextSteps: true
    };
  }

  yield put(dataActions.outdated());

  return {
    skipNextSteps: false
  };
}

function* sendRegisterPhoneRequest(bity, phoneNumber, userId) {
  try {
    const data = yield call(bity.phone.registerPhone, phoneNumber, userId);
    return { data };
  } catch (error) {
    return { error };
  }
}

// --------------------------
// send verification SMS step
// --------------------------
function* sendVerificationCodeStep(phoneNumber) {
  yield put(sendVerificationCodeActions.send(phoneNumber));

  const res = yield race({
    unauth: take(authActions.UNAUTHENTICATED),
    succeed: take(sendVerificationCodeActions.SUCCEED),
    failed: take(sendVerificationCodeActions.FAILED),
    canceled: take(sendVerificationCodeActions.CANCELED)
  });

  if (res.unauth || res.canceled) {
    yield put(actions.canceled());
    return {
      skipNextSteps: true
    };
  }

  if (res.failed) {
    const { payload: error } = res.failed;
    yield put(notificationActions.notify({
      title: 'Error',
      msg: `Can't register phone number ${phoneNumber}.\n${error.message}`
    }));
    yield put(actions.failed(error));
    return {
      skipNextSteps: true
    };
  }

  return {
    skipNextSteps: false
  };
}
