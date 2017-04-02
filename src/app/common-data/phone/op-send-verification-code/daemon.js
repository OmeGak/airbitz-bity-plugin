import { take, put, spawn, call, race } from 'redux-saga/effects';
import * as actions from './actions';
import { actions as dataActions } from '../data';
import { actions as authActions } from '../../auth';
import * as notificationActions from '../../../notifications/actions';

export default function sendVerificationCodeDaemonFactory(bity) {
  return function* runSendVerificationCodeDaemon() {
    return yield [
      yield spawn(listenIntents, bity)
    ];
  };
}

function* listenIntents(bity) {
  while (true) { // eslint-disable-line no-constant-condition
    const { payload: { phoneNumber } } = yield take(actions.SEND);

    yield put(actions.started());

    const res = yield race({
      unauth: take(authActions.UNAUTHENTICATED),
      requestResult: call(sendVerificationCodeRequest, bity, phoneNumber)
    });

    if (res.unauth) {
      yield put(actions.canceled());
      continue; // eslint-disable-line no-continue
    }

    const { error } = res.requestResult;
    if (error) {
      // Do not notify the user of 'already_verified' error.
      // Notification of this error is suppressed in hope that this case will
      // be handled by the code that triggers this operation.
      // The most user-friendly behavior is perform the actions that are performed
      // upon successful verification of the phone number.
      // TODO get rid of hardcoded value
      if (error.code !== 'already_verified') {
        yield call(notifyError, error);
      }

      // If we received this error then most probably our version of phone data is outdated
      // TODO get rid of hardcoded value
      if (error.code === 'already_verified') {
        yield put(dataActions.outdated());
      }

      yield put(actions.failed(error));
      continue; // eslint-disable-line no-continue
    }

    yield call(notifySuccess, phoneNumber);
    yield put(actions.succeed());
  }
}

function* sendVerificationCodeRequest(bity, phoneNumber) {
  try {
    const data = yield call(bity.phone.requestVerificationCode, phoneNumber);
    return { data };
  } catch (error) {
    return { error };
  }
}

function* notifyError(error) {
  yield put(notificationActions.notify({
    title: 'Error',
    msg: `Can't request verification code\n${error.message}`
  }));
}

function* notifySuccess(phoneNumber) {
  yield put(notificationActions.notify({
    title: 'Success',
    msg: `Verification code have been sent to ${phoneNumber}`
  }));
}
