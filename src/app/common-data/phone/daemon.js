import { spawn, take, put, select, race, call } from 'redux-saga/effects';
import { actions as authStoreActions } from '../auth';
import * as actions from './actions';
import * as selectors from './selectors';

export default function phoneStoreDaemonFactory(bity) {
  return function* runPhoneStoreDaemon() {
    yield [
      yield spawn(listenUnauth),
      yield spawn(listenFetchIntents, bity)
    ];
  };
}

function* listenUnauth() {
  while (true) { // eslint-disable-line no-constant-condition
    yield take(authStoreActions.UNAUTHENTICATED);
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

    const fetchPhoneDataResult = yield call(fetchPhoneData, bity);
    if (fetchPhoneDataResult.canceled) {
      yield put(actions.fetchCanceled());
      continue; // eslint-disable-line no-continue
    }

    if (fetchPhoneDataResult.error !== null) {
      yield put(actions.fetchFailed());
      continue; // eslint-disable-line no-continue
    }

    yield put(actions.fetchSucceed(fetchPhoneDataResult.data));
  }
}

function* fetchPhoneData(bity) {
  const res = yield race({
    unauth: take(authStoreActions.UNAUTHENTICATED),
    requestResult: call(sendFetchPhoneDataRequest, bity)
  });

  if (typeof res.unauth !== 'undefined') {
    return { canceled: true };
  }

  const { data, error } = res.requestResult;
  return { data, error };
}

function* sendFetchPhoneDataRequest(bity) {
  try {
    const data = yield call(bity.phone.fetch);
    return { data, error: null };
  } catch (e) {
    return { error: e };
  }
}
