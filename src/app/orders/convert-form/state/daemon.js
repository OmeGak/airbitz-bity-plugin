import { spawn, take, select, put, race } from 'redux-saga/effects';

import * as actions from './actions';

import {
  selectors as exchangeRatesSelectors
} from '../../../common-data/exchange-rates';

import {
  actions as bankAccountStoreActions,
  selectors as quotaSelectors
} from '../../../common-data/quota';

import {
  selectors as bankAccountsSelectors
} from '../../../common-data/bank-accounts';

export default function convertFormDaemonFactory() {
  return function* runConvertFormDaemon() {
    yield [
      yield spawn(onMounted),
      yield spawn(onUnmounted),
      yield spawn(reloadBankAccounts)
    ];
  };
}

function* onMounted() {
  while (true) { // eslint-disable-line no-constant-condition
    yield take(actions.MOUNTED);

    const ratesData = yield select(exchangeRatesSelectors.getData);
    const quotaData = yield select(quotaSelectors.getData);
    const bankAccountsData = yield select(bankAccountsSelectors.getData);

    yield put(actions.bulkUpdate({
      ratesData,
      quotaData,
      bankAccountsData
    }));
  }
}

function* onUnmounted() {
  while (true) { // eslint-disable-line no-constant-condition
    yield take(actions.UNMOUNTED);
    yield put(actions.reset());
  }
}

function* reloadBankAccounts() {
  while (true) { // eslint-disable-line no-constant-condition
    yield take(actions.RELOAD_BANK_ACCOUNTS);
    yield put(actions.loadingOfBankAccountsStarted());

    yield put(bankAccountStoreActions.fetchData(true));
    const res = yield race({
      succeed: take(bankAccountStoreActions.FETCH_SUCCEED),
      failed: take(bankAccountStoreActions.FETCH_FAILED),
      canceled: take(bankAccountStoreActions.FETCH_CANCELED),
      unmounted: take(actions.UNMOUNTED)
    });

    if (typeof res.unmounted !== 'undefined') {
      continue; // eslint-disable-line no-continue
    }

    const bankAccountsData = yield select(bankAccountsSelectors.getData);
    yield put(actions.bankAccountsChanged(bankAccountsData));
    yield put(actions.loadingOfBankAccountsFinished());
  }
}
