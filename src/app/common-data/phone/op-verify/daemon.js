import { take, put, spawn, call, race } from 'redux-saga/effects';
import * as actions from './actions';
import { actions as dataActions } from '../data';
import { actions as authActions } from '../../auth';
import * as notificationActions from '../../../notifications/actions';

export default function verifyPhoneDaemonFactory(bity) {
  return function* runVerifyPhoneDaemon() {
    return yield [
      yield spawn(listenIntents, bity)
    ];
  };
}

function* listenIntents(bity) {
  while (true) { // eslint-disable-line no-constant-condition
    const { payload: { code, phoneNumber } } = yield take(actions.VERIFY);

    yield put(actions.started());

    const res = yield race({
      unauth: take(authActions.UNAUTHENTICATED),
      requestResult: call(sendVerifyPhoneRequest, bity, phoneNumber, code)
    });

    if (res.unauth) {
      yield put(actions.canceled());
      continue; // eslint-disable-line no-continue
    }

    const { error } = res.requestResult;
    if (error) {
      // TODO get rid of hardcoded value
      if (error.code === 'already_verified') {
        yield call(onSuccess);
        continue; // eslint-disable-line no-continue
      }

      yield call(notifyVerificationError, phoneNumber, error);
      yield put(actions.failed(error));
      continue; // eslint-disable-line no-continue
    }

    yield call(onSuccess);
  }
}

function* onSuccess() {
  yield put(dataActions.outdated());
  yield put(actions.succeed());
}

function* sendVerifyPhoneRequest(bity, phoneNumber, code) {
  try {
    const data = yield call(bity.phone.submitVerificationCode, phoneNumber, code);
    return { data };
  } catch (error) {
    return { error };
  }
}

function* notifyVerificationError(phoneNumber, error) {
  yield put(notificationActions.notify({
    title: 'Error',
    msg: `Can't verify phone number ${phoneNumber}\n${error.message}`
  }));
}
