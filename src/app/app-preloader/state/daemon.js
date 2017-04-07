import { take, put, spawn, call, race } from 'redux-saga/effects';

import * as actions from './actions';

import { actions as authActions } from '../../common-data/auth';

export default function appPreloaderDaemonFactory() {
  return function* runAppPreloaderDaemon() {
    yield [
      yield spawn(onMounted)
    ];
  };
}

function* onMounted() {
  while (true) { // eslint-disable-line no-constant-condition
    yield take(actions.MOUNTED);

    yield put(actions.preparationStarted());

    const stepResult = yield call(refreshAccessTokenStep);
    if (stepResult.skipNextSteps) {
      continue; // eslint-disable-line no-continue
    }

    yield put(actions.preparationCompleted());
  }
}

function* refreshAccessTokenStep() {
  yield put(authActions.refreshToken());

  yield race({
    canceled: take(authActions.REFRESH_TOKEN_CANCELED),
    failed: take(authActions.REFRESH_TOKEN_FAILED),
    succeed: take(authActions.REFRESH_TOKEN_SUCCEED)
  });

  return {
    skipNextSteps: false
  };
}
