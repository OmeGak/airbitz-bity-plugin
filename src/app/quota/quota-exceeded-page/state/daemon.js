import { take, put, spawn, race, call, select } from 'redux-saga/effects';
import * as actions from './actions';
import {
  actions as quotaStoreActions,
  selectors as quotaStoreSelectors,
  utils as quotaStoreUtils
} from '../../../common-data/quota';

export default function quotaExceededPageDaemonFactory() {
  return function* runQuotaExceededDaemon() {
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

    const preloadQuotaDataResult = yield call(preloadQuotaData);

    if (preloadQuotaDataResult.canceled) {
      continue; // eslint-disable-line no-continue
    }

    if (preloadQuotaDataResult.failed) {
      yield put(actions.preparationFailed());
      continue; // eslint-disable-line no-continue
    }

    const data = yield select(quotaStoreSelectors.getData);
    const isAnyQuotaExceeded = quotaStoreUtils.isAnyQuotaExceeded(data);
    if (!isAnyQuotaExceeded) {
      router.replace('/');
      continue; // eslint-disable-line no-continue
    }

    yield put(actions.preparationCompleted());
  }
}

function* preloadQuotaData() {
  yield put(quotaStoreActions.fetchData());

  const res = yield race({
    unmounted: take(actions.UNMOUNTED),
    failed: take(quotaStoreActions.FETCH_FAILED),
    succeed: take(quotaStoreActions.FETCH_SUCCEED),
    canceled: take(quotaStoreActions.FETCH_CANCELED),
    alreadyHasData: take(quotaStoreActions.ALREADY_HAS_DATA)
  });

  if (typeof res.unmounted !== 'undefined' || typeof res.canceled !== 'undefined') {
    return { canceled: true };
  }

  if (typeof res.failed !== 'undefined') {
    return { failed: true };
  }

  return { success: true };
}
