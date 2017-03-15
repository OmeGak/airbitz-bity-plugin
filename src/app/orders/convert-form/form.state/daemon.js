import { spawn, take, put, select, race } from 'redux-saga/effects';

import {
  selectors as exchangeRatesSelectors
} from '../../../common-data/exchange-rates';

import {
  selectors as quotaSelectors
} from '../../../common-data/quota';

import {
  selectors as bankAccountsStoreSelectors,
  actions as bankAccountStoreActions
} from '../../../common-data/bank-accounts';

import * as formActions from './form/actions';
import * as bankAccountsActions from './bank-accounts/actions';

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

    yield put(formActions.setupInitialStateData({
      rates,
      quota,
      bankAccounts
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
  }
}
