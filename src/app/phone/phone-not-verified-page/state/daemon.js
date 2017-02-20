import { take, put, spawn, race, call, select } from 'redux-saga/effects';
import * as actions from './actions';
import {
  actions as phoneStoreActions,
  selectors as phoneStoreSelectors,
  utils as phoneStoreUtils
} from '../../../common-data/phone';

export default function phoneNotVerifiedPageDaemonFactory() {
  return function* runPhoneNotVerifiedPageDaemon() {
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

    const preloadPhoneDataResult = yield call(preloadPhoneData);

    if (preloadPhoneDataResult.canceled) {
      continue; // eslint-disable-line no-continue
    }

    if (preloadPhoneDataResult.failed) {
      yield put(actions.preparationFailed());
      continue; // eslint-disable-line no-continue
    }

    const data = yield select(phoneStoreSelectors.getData);
    const hasVerifiedPhoneNumber = phoneStoreUtils.hasVerifiedPhoneNumber(data);
    if (hasVerifiedPhoneNumber) {
      router.replace('/');
      continue; // eslint-disable-line no-continue
    }

    yield put(actions.preparationCompleted());
  }
}

function* preloadPhoneData() {
  yield put(phoneStoreActions.fetchData());

  const res = yield race({
    unmounted: take(actions.UNMOUNTED),
    failed: take(phoneStoreActions.FETCH_FAILED),
    succeed: take(phoneStoreActions.FETCH_SUCCEED),
    canceled: take(phoneStoreActions.FETCH_CANCELED),
    alreadyHasData: take(phoneStoreActions.ALREADY_HAS_DATA)
  });

  if (typeof res.unmounted !== 'undefined' || typeof res.canceled !== 'undefined') {
    return { canceled: true };
  }

  if (typeof res.failed !== 'undefined') {
    return { failed: true };
  }

  return { success: true };
}
