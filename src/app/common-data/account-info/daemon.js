import { take, put, spawn, call, select, race } from 'redux-saga/effects';
import * as authActions from '../../auth/data/actions';
import * as actions from './actions';
import * as selectors from './selectors';

export default function accountInfoDaemonFactory(bity) {
  return function* runAccountInfoDaemon() {
    yield [
      yield spawn(listenFetchAccountInfoRequests, bity),
      yield spawn(listenUnauthEvent)
    ];
  };
}

function* listenFetchAccountInfoRequests(bity) {
  while (true) { // eslint-disable-line no-constant-condition
    yield take(actions.ACCOUNT_INFO_REQUESTED);

    const hasAccountData = yield select(selectors.hasData);
    if (hasAccountData) {
      yield put(actions.alreadyHasData());
      continue; // eslint-disable-line no-continue
    }

    yield put(actions.accountInfoLoadingStarted());

    const { fetchResult, unAuth } = yield race({
      fetchResult: call(fetchAccountInfoData, bity),
      unAuth: take(authActions.UNAUTHENTICATED)
    });

    if (typeof unAuth !== 'undefined') {
      yield put(actions.accountInfoLoadingCanceled());
      continue; // eslint-disable-line no-continue
    }

    const { data, error } = fetchResult;
    if (error !== null) {
      yield put(actions.accountInfoLoadingFailed(error));
    } else {
      yield put(actions.accountInfoLoadingSucceed(data));
    }
  }
}

function* fetchAccountInfoData(bity) {
  try {
    const data = yield call(bity.account.info.fetch);
    return { data, error: null };
  } catch (e) {
    return { data: null, error: e };
  }
}

function* listenUnauthEvent() {
  while (true) { // eslint-disable-line no-constant-condition
    yield take(authActions.UNAUTHENTICATED);
    yield put(actions.resetAccountInfo());
  }
}
