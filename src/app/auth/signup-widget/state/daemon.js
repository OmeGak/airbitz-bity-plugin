import { take, spawn, put, call, race, select } from 'redux-saga/effects';

import * as actions from './actions';
import * as selectors from './selectors';
import * as notificationActions from '../../../notifications/actions';
import { actions as authStoreActions } from '../../../common-data/auth';

export default function signupDaemonFactory(bity) {
  return function* runSignupDaemon() {
    yield [
      yield spawn(listenSignupIntents, bity)
    ];
  };
}

function* listenSignupIntents(bity) {
  while (true) { // eslint-disable-line no-constant-condition
    const { payload: originalFormData } = yield take(actions.SIGNUP_REQUESTED);
    yield put(actions.signupStarted());

    let stepResult;

    stepResult = yield call(signupStep, bity, originalFormData);
    if (stepResult.skipNextSteps) {
      continue; // eslint-disable-line no-continue
    }

    stepResult = yield call(autoLoginStep, originalFormData);
  }
}

// ==========================
// register the user
// ==========================
function* signupStep(bity, originalFormData) {
  const formData = prepareFormData(originalFormData);

  const res = yield race({
    authenticated: take(authStoreActions.AUTHENTICATED),
    signupResult: call(sendSignupRequest, bity, formData)
  });

  const isMounted = yield select(selectors.isMounted);

  if (typeof res.authenticated !== 'undefined') {
    if (isMounted) {
      yield put(actions.signupCanceled());
    }
    return {
      skipNextSteps: true
    };
  }

  const { signupResult: { error } } = res;
  if (error) {
    yield call(notifyAboutFailedSignup, error);
    if (isMounted) {
      yield put(actions.signupFailed(error));
    }
    return {
      skipNextSteps: true
    };
  }

  if (!isMounted) {
    return {
      skipNextSteps: true
    };
  }

  return {
    skipNextSteps: false
  };
}

function* sendSignupRequest(bity, formData) {
  try {
    const data = yield call(bity.signup.signup, formData);
    return { data };
  } catch (error) {
    return { error };
  }
}

function* notifyAboutFailedSignup(error) {
  const title = 'Signup failed';
  const msg = `Signup failed.\n${error.message}`;
  yield put(notificationActions.notify({ title, msg }));
}

function prepareFormData(rawFormData) {
  const { password, email } = rawFormData;
  let username = rawFormData.username;
  if (typeof username !== 'string' || username.length === 0) {
    username = email;
  }

  let affiliateCode;
  try {
    // due this code https://github.com/Airbitz/airbitz-plugins/blob/master/lib/js/airbitz-bridge-dev.js#L101
    affiliateCode = window.Airbitz.config.get('AFFILIATE_CODE');
  } catch (e) { // eslint-disable-line no-empty
  }

  return { username, password, email, affiliateCode };
}

// ==========================
// auto login the user
// ==========================
function* autoLoginStep(formData) {
  const { username, password } = formData;
  yield put(authStoreActions.login({
    user: username,
    password
  }));

  const res = yield race({
    succeed: take(authStoreActions.ON_LOGIN_REQUEST_SUCCEED),
    failed: take(authStoreActions.ON_LOGIN_REQUEST_FAILED)
  });

  if (res.failed) {
    const { payload: error } = res.failed;
    yield call(notifyAboutFailedAutoLogin, error);
  }

  return {
    skipNextSteps: true
  };
}

function* notifyAboutFailedAutoLogin(error) {
  const title = 'Login failed';
  const msg = `Login failed.\n${error.message}`;
  yield put(notificationActions.notify({ title, msg }));
}
