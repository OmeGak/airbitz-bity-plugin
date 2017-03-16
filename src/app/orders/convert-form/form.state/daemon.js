import { spawn, take, put, select, race } from 'redux-saga/effects';

import {
  selectors as exchangeRatesSelectors
} from '../../../common-data/exchange-rates';

import {
  selectors as quotaSelectors
} from '../../../common-data/quota';

import {
  selectors as paymentMethodsStoreSelectors
} from '../../../common-data/payment-methods';

import {
  selectors as bankAccountsStoreSelectors,
  actions as bankAccountStoreActions
} from '../../../common-data/bank-accounts';

import * as formActions from './form/actions';
import * as bankAccountsActions from './bank-accounts/actions';

import * as exchangePartiesSelectors from './exchange-parties/selectors';
import * as bankAccountsSelectors from './bank-accounts/selectors';
import * as paymentMethodsSelectors from './payment-methods/selectors';
import * as externalReferenceSelectors from './external-reference/selectors';

import { actions as exchangeOrderActions } from '../../../common-data/exchange-order';

export default function convertFormDaemonFactory() {
  return function* runConvertFormDaemon() {
    yield [
      yield spawn(onMounted),
      yield spawn(refreshBankAccountsData),
      yield spawn(listenSubmitIntents)
    ];
  };
}

function* onMounted() {
  while (true) { // eslint-disable-line no-constant-condition
    yield take(formActions.MOUNTED);

    const rates = yield select(exchangeRatesSelectors.getData);
    const quota = yield select(quotaSelectors.getData);
    const bankAccounts = yield select(bankAccountsStoreSelectors.getData);
    const paymentMethods = yield select(paymentMethodsStoreSelectors.getData);

    yield put(formActions.setupInitialStateData({
      rates,
      quota,
      bankAccounts,
      paymentMethods
    }));
  }
}

function* refreshBankAccountsData() {
  while (true) { // eslint-disable-line no-constant-condition
    yield take(bankAccountsActions.REFRESH_REQUESTED);
    yield put(bankAccountsActions.refreshStarted());

    yield put(bankAccountStoreActions.fetchData(true));

    const res = yield race({
      succeed: take(bankAccountStoreActions.FETCH_SUCCEED),
      failed: take(bankAccountStoreActions.FETCH_FAILED),
      canceled: take(bankAccountStoreActions.FETCH_CANCELED),
      unmounted: take(formActions.UNMOUNTED)
    });
    if (typeof res.unmounted !== 'undefined') {
      continue; // eslint-disable-line no-continue
    }

    const bankAccountsData = yield select(bankAccountsStoreSelectors.getData);
    yield put(bankAccountsActions.allAccountsChanged(bankAccountsData));

    yield put(bankAccountsActions.refreshFinished());
  }
}

function* listenSubmitIntents() {
  while (true) { // eslint-disable-line no-constant-condition
    yield take(formActions.SUBMIT);
    yield put(formActions.submitStarted());

    const rawInputAmount = yield select(exchangePartiesSelectors.getInputAmount);
    const inputAmount = parseFloat(rawInputAmount);
    const inputCurrencyCode = yield select(exchangePartiesSelectors.getInputSelectedCurrencyCode);
    const outputCurrencyCode = yield select(exchangePartiesSelectors.getOutputSelectedCurrencyCode);
    const bankAccountId = yield select(bankAccountsSelectors.getSelectedAccountId);
    const paymentMethodCode = yield select(paymentMethodsSelectors.getSelectedPaymentMethodId);
    const externalReference = yield select(externalReferenceSelectors.getExternalReference);

    const formData = {
      inputAmount,
      inputCurrencyCode,
      outputCurrencyCode,
      bankAccountId,
      paymentMethodCode,
      externalReference
    };
    yield put(exchangeOrderActions.createOrder(formData));
  }
}
