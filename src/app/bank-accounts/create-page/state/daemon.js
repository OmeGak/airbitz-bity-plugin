import { take, put, spawn, race, call, select } from 'redux-saga/effects';

import * as actions from './actions';
import * as selectors from './selectors';

import {
  actions as accountInfoActions,
  selectors as accountInfoSelectors
} from '../../../common-data/account-info';

import { add as addOp } from '../../../common-data/bank-accounts';

import { backToConvertPageLink } from '../constants';

let onBankAccountAddedTaskStarted = false;

export default function addBankAccountPageDaemonFactory() {
  return function* runAddBankAccountPageDaemon() {
    yield [
      yield spawn(preparePage),
      yield spawn(listenAddBankAccountIntents)
    ];
  };
}

// --------------------------
// prepare page
// --------------------------
function* preparePage() {
  while (true) { // eslint-disable-line no-constant-condition
    const { payload: { router } } = yield take(actions.MOUNTED);

    yield put(actions.preparationStarted());

    const stepResult = yield call(preloadAccountInfoStep);
    if (stepResult.skipNextSteps === true) {
      continue; // eslint-disable-line no-continue
    }

    yield put(actions.preparationCompleted());

    // TODO get rid of static variable
    if (!onBankAccountAddedTaskStarted) {
      onBankAccountAddedTaskStarted = true;
      yield spawn(onBankAccountAdded, router);
    }
  }
}

function* preloadAccountInfoStep() {
  yield put(accountInfoActions.fetchAccountInfo());

  const res = yield race({
    unmounted: take(actions.UNMOUNTED),
    succeed: take(accountInfoActions.ACCOUNT_INFO_LOADING_SUCCEED),
    failed: take(accountInfoActions.ACCOUNT_INFO_LOADING_FAILED),
    canceled: take(accountInfoActions.ACCOUNT_INFO_LOADING_CANCELED),
    cached: take(accountInfoActions.ALREADY_HAS_DATA)
  });

  if (res.unmounted || res.canceled) {
    return {
      skipNextSteps: true
    };
  }

  if (res.failed) {
    yield put(actions.preparationFailed());
    return {
      skipNextSteps: true
    };
  }

  return {
    skipNextSteps: false
  };
}

// --------------------------
// handle 'add bank account' intents
// --------------------------
function* listenAddBankAccountIntents() {
  while (true) { // eslint-disable-line no-constant-condition
    const { payload: data } = yield take(actions.ADD);
    const { userId } = yield select(accountInfoSelectors.getData);

    yield put(addOp.actions.add(data, userId));
  }
}

// --------------------------
// redirect to page 'convert' after bank account was added
// --------------------------
function* onBankAccountAdded(router) {
  while (true) { // eslint-disable-line no-constant-condition
    yield take(addOp.actions.SUCCEED);

    const isMounted = yield select(selectors.isMounted);
    if (!isMounted) {
      continue; // eslint-disable-line no-continue
    }

    // TODO get rid of router
    router.replace(backToConvertPageLink);
  }
}
