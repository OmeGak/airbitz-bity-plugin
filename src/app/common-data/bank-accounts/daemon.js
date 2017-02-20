import { spawn, take, put, select, race, call } from 'redux-saga/effects';
import * as authActions from '../../auth/data/actions';
import * as actions from './actions';
import * as selectors from './selectors';

export default function bankAccountsStoreDaemonFactory(bity) {
  return function* runBankAccountsStoreDaemon() {
    yield [
      yield spawn(listenUnauth),
      yield spawn(listenFetchIntents, bity)
    ];
  };
}

function* listenUnauth() {
  while (true) { // eslint-disable-line no-constant-condition
    yield take(authActions.UNAUTHENTICATED);
    yield put(actions.reset());
  }
}

function* listenFetchIntents(bity) {
  while (true) { // eslint-disable-line no-constant-condition
    yield take(actions.FETCH_DATA);

    const hasData = yield select(selectors.hasData);
    if (hasData) {
      yield put(actions.alreadyHasData());
      continue; // eslint-disable-line no-continue
    }

    yield put(actions.fetchStarted());

    const fetchDataResult = yield call(fetchData, bity);
    if (fetchDataResult.canceled) {
      yield put(actions.fetchCanceled());
      continue; // eslint-disable-line no-continue
    }

    if (fetchDataResult.error !== null) {
      yield put(actions.fetchFailed());
      continue; // eslint-disable-line no-continue
    }

    yield put(actions.fetchSucceed(fetchDataResult.data));
  }
}

function* fetchData(bity) {
  const res = yield race({
    unauth: take(authActions.UNAUTHENTICATED),
    requestResult: call(sendFetchDataRequest, bity)
  });

  if (typeof res.unauth !== 'undefined') {
    return { canceled: true };
  }

  const { data, error } = res.requestResult;
  return { data, error };
}

function* sendFetchDataRequest(bity) {
  try {
    const data = yield call(bity.bankAccounts.fetch);
    return { data, error: null };
  } catch (e) {
    return { error: e };
  }
}
