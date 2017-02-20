import { spawn, take, put, select, race, call } from 'redux-saga/effects';
import * as authActions from '../../auth/data/actions';
import {
  actions as accountInfoActions,
  selectors as accountInfoSelectors
} from '../account-info';
import * as actions from './actions';
import * as selectors from './selectors';

export default function quotaStoreDaemonFactory(bity) {
  return function* runQuotaStoreDaemon() {
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

    const preloadAccountInfoResult = yield call(preloadAccountInfoData);
    if (preloadAccountInfoResult.canceled) {
      yield put(actions.fetchCanceled());
      continue; // eslint-disable-line no-continue
    }

    if (preloadAccountInfoResult.failed) {
      yield put(actions.fetchFailed());
      continue; // eslint-disable-line no-continue
    }

    const fetchQuotaDataResult = yield call(fetchQuotaData, bity);
    if (fetchQuotaDataResult.canceled) {
      yield put(actions.fetchCanceled());
      continue; // eslint-disable-line no-continue
    }

    if (fetchQuotaDataResult.error !== null) {
      yield put(actions.fetchFailed());
      continue; // eslint-disable-line no-continue
    }

    yield put(actions.fetchSucceed(fetchQuotaDataResult.data));
  }
}

function* preloadAccountInfoData() {
  yield put(accountInfoActions.fetchAccountInfo());

  const res = yield race({
    unauth: take(authActions.UNAUTHENTICATED),
    succeed: take(accountInfoActions.ACCOUNT_INFO_LOADING_SUCCEED),
    failed: take(accountInfoActions.ACCOUNT_INFO_LOADING_FAILED),
    canceled: take(accountInfoActions.ACCOUNT_INFO_LOADING_CANCELED),
    alreadyHasData: take(accountInfoActions.ALREADY_HAS_DATA)
  });

  if (typeof res.unauth !== 'undefined' || typeof res.canceled !== 'undefined') {
    return { canceled: true };
  }

  if (typeof res.succeed !== 'undefined' || typeof res.alreadyHasData !== 'undefined') {
    return { succeed: true };
  }

  return { failed: true };
}

function* fetchQuotaData(bity) {
  const { userId } = yield select(accountInfoSelectors.getData);
  const res = yield race({
    unauth: take(authActions.UNAUTHENTICATED),
    requestResult: call(sendFetchQuotaDataRequest, bity, userId)
  });

  if (typeof res.unauth !== 'undefined') {
    return { canceled: true };
  }

  const { data, error } = res.requestResult;
  return { data, error };
}

function* sendFetchQuotaDataRequest(bity, userId) {
  try {
    const data = yield call(bity.quota.fetch, userId);
    return { data, error: null };
  } catch (e) {
    return { error: e };
  }
}
