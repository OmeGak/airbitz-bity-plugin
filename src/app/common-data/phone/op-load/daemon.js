import { take, put, spawn, call, race, select } from 'redux-saga/effects';
import * as actions from './actions';
import { actions as authActions } from '../../auth';
import { actions as dataActions, selectors as dataSelectors } from '../data';
import { actions as registerOpActions, selectors as registerOpSelectors } from '../op-register';
import { actions as verifyOpActions, selectors as verifyOpSelectors } from '../op-verify';

export default function loadPhoneDaemonFactory(bity) {
  return function* runLoadPhoneDaemon() {
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
  let stepResult;

  stepResult = yield call(waitForEndOfRegisterPhoneOperationStep);
  if (stepResult.skipNextSteps) {
    return {
      skipNextSteps: true
    };
  }

  stepResult = yield call(waitForEndOfVerifyPhoneOperationStep);
  if (stepResult.skipNextSteps) {
    return {
      skipNextSteps: true
    };
  }

  return {
    skipNextSteps: false
  };
}

function* waitForEndOfRegisterPhoneOperationStep() {
  const isStarted = yield select(registerOpSelectors.isStarted);
  if (!isStarted) {
    return {
      skipNextSteps: false
    };
  }

  const res = yield race({
    unauth: take(authActions.UNAUTHENTICATED),
    failed: take(registerOpActions.FAILED),
    canceled: take(registerOpActions.CANCELED),
    succeed: take(registerOpActions.SUCCEED)
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

function* waitForEndOfVerifyPhoneOperationStep() {
  const isStarted = yield select(verifyOpSelectors.isStarted);
  if (!isStarted) {
    return {
      skipNextSteps: false
    };
  }

  const res = yield race({
    unauth: take(authActions.UNAUTHENTICATED),
    failed: take(verifyOpActions.FAILED),
    canceled: take(verifyOpActions.CANCELED),
    succeed: take(verifyOpActions.SUCCEED)
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
  const result = yield race({
    unauth: take(authActions.UNAUTHENTICATED),
    requestResult: call(sendRequest, bity)
  });

  if (result.unauth) {
    yield put(actions.canceled());
    return {
      skipNextSteps: true
    };
  }

  if (result.requestResult.error) {
    yield put(actions.failed(result.requestResult.error));
    // TODO show notification (maybe)
    return {
      skipNextSteps: true
    };
  }

  yield put(dataActions.changed(result.requestResult.data));
  yield put(actions.succeed());
  return {
    skipNextSteps: true
  };
}

function* sendRequest(bity) {
  const query = {
    is_active: true
  };

  try {
    const data = yield call(bity.phone.loadListOfPhones, query);
    return { data };
  } catch (error) {
    return { error };
  }
}
