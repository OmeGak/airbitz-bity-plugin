import { take, put, spawn, race, call } from 'redux-saga/effects';
import * as actions from './actions';
import { actions as dataActions } from '../data';
import { actions as authActions } from '../../auth';
import * as notificationActions from '../../../notifications/actions';

export default function addBankAccountDaemonFactory(bity) {
  return function* runAddBankAccountDaemon() {
    return yield [
      yield spawn(listenIntents, bity)
    ];
  };
}

function* listenIntents(bity) {
  while (true) { // eslint-disable-line no-constant-condition
    const { payload: { data, userId } } = yield take(actions.ADD);

    yield put(actions.started());

    const stepResult = yield call(addBankAccountStep, bity, data, userId);
    if (stepResult.skipNextSteps) {
      continue; // eslint-disable-line no-continue
    }

    yield put(notificationActions.notify({
      title: 'Success',
      msg: 'Bank account has been registered'
    }));
    yield put(dataActions.outdated());
    yield put(actions.succeed());
  }
}

function* addBankAccountStep(bity, data, userId) {
  const res = yield race({
    unauth: take(authActions.UNAUTHENTICATED),
    requestResult: call(sendRequest, bity, data, userId)
  });

  if (res.unauth) {
    yield put(actions.canceled());
    return {
      skipNextSteps: true
    };
  }

  const { error } = res.requestResult;
  if (error) {
    yield put(notificationActions.notify({
      title: 'Error',
      msg: `Can't register bank account\n${error.message}`
    }));
    yield put(actions.failed(error));
    return {
      skipNextSteps: true
    };
  }

  return {
    skipNextSteps: false
  };
}

function* sendRequest(bity, formData, userId) {
  try {
    const data = yield call(bity.bankAccounts.add, formData, userId);
    return { data };
  } catch (error) {
    return { error };
  }
}
