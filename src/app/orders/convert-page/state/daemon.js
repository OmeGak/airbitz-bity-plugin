import { take, put, spawn, race, call, select } from 'redux-saga/effects';
import * as actions from './actions';
import {
  actions as quotaStoreActions,
  selectors as quotaStoreSelectors,
  utils as quotaStoreUtils
} from '../../../common-data/quota';
import {
  actions as phoneStoreActions,
  selectors as phoneStoreSelectors,
  utils as phoneStoreUtils
} from '../../../common-data/phone';
import {
  actions as bankAccountsStoreActions
} from '../../../common-data/bank-accounts';
import {
  actions as exchangeRatesStoreActions
} from '../../../common-data/exchange-rates';
import {
  actions as paymentMethodsStoreActions
} from '../../../common-data/payment-methods';
import {
  actions as airbitzWalletStoreActions
} from '../../../common-data/airbitz-wallet';

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

    // ----------------------
    // make sure quota is not exceeded
    // ----------------------
    const quotaIsNotExceeded = yield call(verifyQuotaIsNotExceeded, router);
    if (quotaIsNotExceeded.canceled || quotaIsNotExceeded.skipNextSteps) {
      continue; // eslint-disable-line no-continue
    }
    if (quotaIsNotExceeded.failed) {
      yield put(actions.preparationFailed());
      continue; // eslint-disable-line no-continue
    }

    // ----------------------
    // make sure account is activated
    // ----------------------
    const accountIsActivated = yield call(verifyAccountIsActivated, router);
    if (accountIsActivated.canceled || accountIsActivated.skipNextSteps) {
      continue; // eslint-disable-line no-continue
    }
    if (accountIsActivated.failed) {
      yield put(actions.preparationFailed());
      continue; // eslint-disable-line no-continue
    }

    // ----------------------
    // make sure the data of selected Airbitz wallet is preloaded
    // ----------------------
    const airbitzWalletDataPreloading = yield call(preloadAirbitzWalletData);
    if (airbitzWalletDataPreloading.failed) {
      yield put(actions.preparationFailed());
      continue; // eslint-disable-line no-continue
    }

    // ----------------------
    // make sure bank accounts preloaded
    // ----------------------
    const bankAccountsPreloading = yield call(preloadBankAccounts);
    if (bankAccountsPreloading.canceled || bankAccountsPreloading.skipNextSteps) {
      continue; // eslint-disable-line no-continue
    }
    if (bankAccountsPreloading.failed) {
      yield put(actions.preparationFailed());
      continue; // eslint-disable-line no-continue
    }

    // ----------------------
    // make sure exchange rates preloaded
    // ----------------------
    const exchangeRatesPreloading = yield call(preloadExchangeRates);
    if (exchangeRatesPreloading.canceled || exchangeRatesPreloading.skipNextSteps) {
      continue; // eslint-disable-line no-continue
    }
    if (exchangeRatesPreloading.failed) {
      yield put(actions.preparationFailed());
      continue; // eslint-disable-line no-continue
    }

    // ----------------------
    // make sure payment methods preloaded
    // ----------------------
    const paymentMethodsPreloading = yield call(preloadPaymentMethods);
    if (paymentMethodsPreloading.canceled || paymentMethodsPreloading.skipNextSteps) {
      continue; // eslint-disable-line no-continue
    }
    if (paymentMethodsPreloading.failed) {
      yield put(actions.preparationFailed());
      continue; // eslint-disable-line no-continue
    }

    // ----------------------
    // if everything is okay
    // ----------------------
    yield put(actions.preparationCompleted());
  }
}

function* verifyQuotaIsNotExceeded(router) {
  yield put(quotaStoreActions.fetchData());

  const res = yield race({
    unmounted: take(actions.UNMOUNTED),
    canceled: take(quotaStoreActions.FETCH_CANCELED),
    failed: take(quotaStoreActions.FETCH_FAILED),
    succeed: take(quotaStoreActions.FETCH_SUCCEED),
    alreadyHasData: take(quotaStoreActions.ALREADY_HAS_DATA)
  });

  if (typeof res.unmounted !== 'undefined' || typeof res.canceled !== 'undefined') {
    return { canceled: true };
  }

  if (typeof res.failed !== 'undefined') {
    return { failed: true };
  }

  const quotaData = yield select(quotaStoreSelectors.getData);
  const isQuotaExceeded = quotaStoreUtils.isAnyQuotaExceeded(quotaData);
  if (isQuotaExceeded) {
    router.replace('/quota/exceeded');
    return { skipNextSteps: true };
  }

  return { success: true };
}

function* verifyAccountIsActivated(router) {
  yield put(phoneStoreActions.fetchData());

  const res = yield race({
    unmounted: take(actions.UNMOUNTED),
    canceled: take(phoneStoreActions.FETCH_CANCELED),
    failed: take(phoneStoreActions.FETCH_FAILED),
    succeed: take(phoneStoreActions.FETCH_SUCCEED),
    alreadyHasData: take(phoneStoreActions.ALREADY_HAS_DATA)
  });

  if (typeof res.unmounted !== 'undefined' || typeof res.canceled !== 'undefined') {
    return { canceled: true };
  }

  if (typeof res.failed !== 'undefined') {
    return { failed: true };
  }

  const phoneData = yield select(phoneStoreSelectors.getData);
  const hasVerifiedPhoneNumber = phoneStoreUtils.hasVerifiedPhoneNumber(phoneData);
  if (!hasVerifiedPhoneNumber) {
    router.replace('/phone/not-verified');
    return { skipNextSteps: true };
  }

  return { success: true };
}

function* preloadBankAccounts() {
  yield put(bankAccountsStoreActions.fetchData());

  const res = yield race({
    unmounted: take(actions.UNMOUNTED),
    canceled: take(bankAccountsStoreActions.FETCH_CANCELED),
    failed: take(bankAccountsStoreActions.FETCH_FAILED),
    succeed: take(bankAccountsStoreActions.FETCH_SUCCEED),
    alreadyHasData: take(bankAccountsStoreActions.ALREADY_HAS_DATA)
  });

  if (typeof res.unmounted !== 'undefined' || typeof res.canceled !== 'undefined') {
    return { canceled: true };
  }

  if (typeof res.failed !== 'undefined') {
    return { failed: true };
  }

  return { success: true };
}

function* preloadExchangeRates() {
  yield put(exchangeRatesStoreActions.fetchData());

  const res = yield race({
    unmounted: take(actions.UNMOUNTED),
    canceled: take(exchangeRatesStoreActions.FETCH_CANCELED),
    failed: take(exchangeRatesStoreActions.FETCH_FAILED),
    succeed: take(exchangeRatesStoreActions.FETCH_SUCCEED),
    alreadyHasData: take(exchangeRatesStoreActions.ALREADY_HAS_DATA)
  });

  if (typeof res.unmounted !== 'undefined' || typeof res.canceled !== 'undefined') {
    return { canceled: true };
  }

  if (typeof res.failed !== 'undefined') {
    return { failed: true };
  }

  return { success: true };
}

function* preloadPaymentMethods() {
  yield put(paymentMethodsStoreActions.fetchData());

  const res = yield race({
    unmounted: take(actions.UNMOUNTED),
    canceled: take(paymentMethodsStoreActions.FETCH_CANCELED),
    failed: take(paymentMethodsStoreActions.FETCH_FAILED),
    succeed: take(paymentMethodsStoreActions.FETCH_SUCCEED),
    alreadyHasData: take(paymentMethodsStoreActions.ALREADY_HAS_DATA)
  });

  if (typeof res.unmounted !== 'undefined' || typeof res.canceled !== 'undefined') {
    return { canceled: true };
  }

  if (typeof res.failed !== 'undefined') {
    return { failed: true };
  }

  return { success: true };
}

function* preloadAirbitzWalletData() {
  yield put(airbitzWalletStoreActions.fetchData());

  const res = yield race({
    unmounted: take(actions.UNMOUNTED),
    succeed: take(airbitzWalletStoreActions.FETCH_SUCCEED),
    alreadyHasData: take(airbitzWalletStoreActions.ALREADY_HAS_DATA)
  });

  if (typeof res.unmounted !== 'undefined') {
    return { canceled: true };
  }

  return { success: true };
}
