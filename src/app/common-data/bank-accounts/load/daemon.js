import { take, put, race, spawn, call, select } from 'redux-saga/effects';

import * as actions from './actions';
import { actions as authActions } from '../../auth';
import { actions as dataActions, selectors as dataSelectors } from '../data';
import { actions as addActions, selectors as addSelectors } from '../add';

export default function loadBankAccountsDaemonFactory(bity) {
  return function* runLoadBankAccountsDaemon() {
    return yield [
      yield spawn(listenIntents, bity)
    ];
  };
}

function* listenIntents(bity) {
  while (true) { // eslint-disable-line no-constant-condition
    const { payload: skipCache } = yield take(actions.LOAD);
    const isOutdated = yield select(dataSelectors.isOutdated);
    if (!isOutdated && !skipCache) {
      yield put(actions.cached());
      continue; // eslint-disable-line no-continue
    }

    yield put(actions.started());

    const stepResult = yield call(waitForConcurrentOpsStep);
    if (stepResult.skipNextSteps) {
      continue; // eslint-disable-line no-continue
    }

    yield call(sendRequestStep, bity);
  }
}

function* waitForConcurrentOpsStep() {
  const stepResult = yield call(waitForEndOfRegisterBankAccountOperationStep);
  if (stepResult.skipNextSteps) {
    return {
      skipNextSteps: true
    };
  }

  return {
    skipNextSteps: false
  };
}

function* waitForEndOfRegisterBankAccountOperationStep() {
  const isStarted = yield select(addSelectors.isStarted);
  if (!isStarted) {
    return {
      skipNextSteps: false
    };
  }

  const res = yield race({
    unauth: take(authActions.UNAUTHENTICATED),
    failed: take(addActions.FAILED),
    canceled: take(addActions.CANCELED),
    succeed: take(addActions.SUCCEED)
  });

  if (res.unauth || res.canceled) {
    yield put(actions.canceled());
    return {
      skipNextSteps: true
    };
  }

  return {
    skipNextSteps: false
  };
}

function* sendRequestStep(bity) {
  const res = yield race({
    unauth: take(authActions.UNAUTHENTICATED),
    requestResult: call(sendRequest, bity)
  });

  if (res.unauth) {
    yield put(actions.canceled());
    return {
      skipNextSteps: true
    };
  }

  if (res.requestResult.error) {
    yield put(actions.failed(res.requestResult.error));
    // TODO show notification (maybe)
    return {
      skipNextSteps: true
    };
  }

  yield put(dataActions.changed(res.requestResult.data));
  yield put(actions.succeed());
  return {
    skipNextSteps: true
  };
}

function* sendRequest(bity) {
  const query = {
    disabled: false
  };

  try {
    const data = yield call(bity.bankAccounts.loadListOfBankAccounts, query);
    return { data };
  } catch (error) {
    return { error };
  }
}
