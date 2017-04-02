import { take, put, spawn, race, call, select } from 'redux-saga/effects';

import * as actions from './actions';

import {
  actions as accountInfoActions,
  selectors as accountInfoSelectors
} from '../../../common-data/account-info';

import { register as registerOp } from '../../../common-data/phone';

export default function registerPhonePageDaemonFactory() {
  return function* runRegisterPhonePageDaemon() {
    yield [
      yield spawn(preparePage),
      yield spawn(listenRegisterPhoneIntents)
    ];
  };
}

// --------------------------
// prepare page
// --------------------------
function* preparePage() {
  while (true) { // eslint-disable-line no-constant-condition
    yield take(actions.MOUNTED);

    yield put(actions.preparationStarted());

    const stepResult = yield call(preloadAccountInfoStep);
    if (stepResult.skipNextSteps === true) {
      continue; // eslint-disable-line no-continue
    }

    yield put(actions.preparationCompleted());
  }
}

function* preloadAccountInfoStep() {
  yield put(accountInfoActions.fetchAccountInfo());

  const res = yield race({
    unmounted: take(actions.UNMOUNTED),
    succeed: take(accountInfoActions.ACCOUNT_INFO_LOADING_SUCCEED),
    failed: take(accountInfoActions.ACCOUNT_INFO_LOADING_FAILED),
    canceled: take(accountInfoActions.ACCOUNT_INFO_LOADING_CANCELED),
    cached: take(accountInfoActions.ALREADY_HAS_DATA)
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

  return {
    skipNextSteps: false
  };
}

// --------------------------
// handle 'register' intents
// --------------------------
function* listenRegisterPhoneIntents() {
  while (true) { // eslint-disable-line no-constant-condition
    const { payload: { phoneNumber, router } } = yield take(actions.REGISTER);
    const { userId } = yield select(accountInfoSelectors.getData);

    yield put(registerOp.actions.register(phoneNumber, userId));

    const res = yield race({
      unmounted: take(actions.UNMOUNTED),
      canceled: take(registerOp.actions.CANCELED),
      failed: take(registerOp.actions.FAILED),
      succeed: take(registerOp.actions.SUCCEED)
    });

    if (res.unmounted || res.canceled || res.failed) {
      continue; // eslint-disable-line no-continue
    }

    gotoVerifyPhonePage(router);
  }
}

// --------------------------
// routing
// --------------------------
function gotoVerifyPhonePage(router) {
  router.replace('phone/verify');
}
