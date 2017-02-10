import { take, spawn, put, call, select } from 'redux-saga/effects';
import * as actions from './actions';
import * as selectors from './selectors';

export default function paymentMethodsDaemonFactory(bity) {
  return function* runPaymentMethodsDaemon() {
    yield [
      spawn(listenFetchIntents, bity)
    ];
  }
}

function* listenFetchIntents(bity) {
  while (true) {
    yield take(actions.FETCH_REQUESTED);

    const hasPristineData = yield select(selectors.hasPristineData);
    if (!hasPristineData) {
      yield put(actions.alreadyHasData());
      continue;
    }

    try {
      const data = yield call(bity.paymentMethods.fetchAllMethods);
      yield put(actions.fetchSucceed(data));
    } catch (e) {
      yield put(actions.fetchFailed(e));
    }
  }
}
