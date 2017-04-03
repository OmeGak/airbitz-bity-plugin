import { take, put, spawn, race, call, select } from 'redux-saga/effects';

import * as actions from './actions';

import {
  actions as quotaStoreActions,
  selectors as quotaStoreSelectors,
  utils as quotaStoreUtils
} from '../../../common-data/quota';

import { load as loadBankAccountsOp } from '../../../common-data/bank-accounts';

import { actions as exchangeRatesStoreActions } from '../../../common-data/exchange-rates';

import { actions as paymentMethodsStoreActions } from '../../../common-data/payment-methods';

import {
  data as phoneDataStore,
  load as loadPhoneOp
} from '../../../common-data/phone';

export default function convertPageDaemonFactory() {
  return function* runConvertPageDaemon() {
    yield [
      yield spawn(preparePage),
      yield spawn(resetStateAfterUnmounting)
    ];
  };
}

function* resetStateAfterUnmounting() {
  while (true) { // eslint-disable-line no-constant-condition
    yield take(actions.UNMOUNTED);
    yield put(actions.reset());
  }
}

function* preparePage() {
  while (true) { // eslint-disable-line no-constant-condition
    const { payload: { router } } = yield take(actions.MOUNTED);

    yield put(actions.preparationStarted());

    let stepResult;

    stepResult = yield call(checkPhoneStep, router);
    if (stepResult.skipNextSteps === true) {
      continue; // eslint-disable-line no-continue
    }

    stepResult = yield call(checkQuotaStep, router);
    if (stepResult.skipNextSteps === true) {
      continue; // eslint-disable-line no-continue
    }

    stepResult = yield call(preloadBankAccountsStep);
    if (stepResult.skipNextSteps === true) {
      continue; // eslint-disable-line no-continue
    }

    stepResult = yield call(preloadExchangeRatesStep);
    if (stepResult.skipNextSteps === true) {
      continue; // eslint-disable-line no-continue
    }

    stepResult = yield call(preloadPaymentMethodsStep);
    if (stepResult.skipNextSteps === true) {
      continue; // eslint-disable-line no-continue
    }

    // ----------------------
    // if everything is okay
    // ----------------------
    yield put(actions.preparationCompleted());
  }
}

// --------------------------
// check active and verified phone exists
// --------------------------
function* checkPhoneStep(router) {
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

  const hasActivePhone = yield select(phoneDataStore.selectors.hasData);
  if (!hasActivePhone) {
    goToRegisterPhonePage(router);
    return {
      skipNextSteps: true
    };
  }

  const phone = yield select(phoneDataStore.selectors.getData);

  if (!phone.isActive) {
    goToRegisterPhonePage(router);
    return {
      skipNextSteps: true
    };
  }

  if (!phone.isVerified) {
    goToVerifyPhonePage(router);
    return {
      skipNextSteps: true
    };
  }

  return {
    skipNextSteps: false
  };
}

// --------------------------
// check active and verified phone
// --------------------------
function* checkQuotaStep(router) {
  yield put(quotaStoreActions.fetchData());

  const res = yield race({
    unmounted: take(actions.UNMOUNTED),
    canceled: take(quotaStoreActions.FETCH_CANCELED),
    failed: take(quotaStoreActions.FETCH_FAILED),
    succeed: take(quotaStoreActions.FETCH_SUCCEED),
    alreadyHasData: take(quotaStoreActions.ALREADY_HAS_DATA)
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

  const quotaData = yield select(quotaStoreSelectors.getData);
  const isQuotaExceeded = quotaStoreUtils.isAnyQuotaExceeded(quotaData);
  if (isQuotaExceeded) {
    goToQuotaExceededPage(router);
    return {
      skipNextSteps: true
    };
  }

  return {
    skipNextSteps: false
  };
}

// --------------------------
// preload bank accounts
// --------------------------
function* preloadBankAccountsStep() {
  yield put(loadBankAccountsOp.actions.load());

  const res = yield race({
    unmounted: take(actions.UNMOUNTED),
    canceled: take(loadBankAccountsOp.actions.CANCELED),
    failed: take(loadBankAccountsOp.actions.FAILED),
    succeed: take(loadBankAccountsOp.actions.SUCCEED),
    cached: take(loadBankAccountsOp.actions.CACHED)
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
// preload exchange rates
// --------------------------
function* preloadExchangeRatesStep() {
  yield put(exchangeRatesStoreActions.fetchData());

  const res = yield race({
    unmounted: take(actions.UNMOUNTED),
    canceled: take(exchangeRatesStoreActions.FETCH_CANCELED),
    failed: take(exchangeRatesStoreActions.FETCH_FAILED),
    succeed: take(exchangeRatesStoreActions.FETCH_SUCCEED),
    alreadyHasData: take(exchangeRatesStoreActions.ALREADY_HAS_DATA)
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
// preload payment methods
// --------------------------
function* preloadPaymentMethodsStep() {
  yield put(paymentMethodsStoreActions.fetchData());

  const res = yield race({
    unmounted: take(actions.UNMOUNTED),
    canceled: take(paymentMethodsStoreActions.FETCH_CANCELED),
    failed: take(paymentMethodsStoreActions.FETCH_FAILED),
    succeed: take(paymentMethodsStoreActions.FETCH_SUCCEED),
    alreadyHasData: take(paymentMethodsStoreActions.ALREADY_HAS_DATA)
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
// routing
// --------------------------
function goToRegisterPhonePage(router) {
  router.replace('phone/register');
}

function goToVerifyPhonePage(router) {
  router.replace('phone/verify');
}

function goToQuotaExceededPage(router) {
  router.replace('/quota/exceeded');
}
