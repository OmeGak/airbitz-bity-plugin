import { eventChannel } from 'redux-saga';
import { spawn, take, call, put, select } from 'redux-saga/effects';
import * as actions from './actions';
import * as selectors from './selectors';

export default function authDaemonFactory(bity) {
  return function* runAuthDaemon() {
    yield [
      yield spawn(listenAuthStatus, bity),
      yield spawn(listenLoginRequests, bity),
      yield spawn(listenLogoutRequests, bity)
    ];
  };
}

function* listenAuthStatus(bity) {
  yield put(actions.authStatusChanged(bity.auth.isAuthenticated()));

  const channel = yield call(authStatusListener, bity);
  while (true) { // eslint-disable-line no-constant-condition
    const { status } = yield take(channel);
    yield put(actions.authStatusChanged(status));
  }
}

function authStatusListener(bity) {
  return eventChannel((emitter) => {
    bity.auth.onAuthStatusChanged(() => {
      emitter({
        status: bity.auth.isAuthenticated()
      });
    });

    return unsubscribe;

    function unsubscribe() {}
  });
}

function* listenLoginRequests(bity) {
  while (true) { // eslint-disable-line no-constant-condition
    const { payload: { user, password } } = yield take(actions.LOGIN_REQUESTED);

    const isAuthenticated = yield select(selectors.isAuthenticated);
    if (isAuthenticated) {
      continue; // eslint-disable-line no-continue
    }

    yield put(actions.onLoginRequestStarted());
    try {
      yield call(bity.auth.login, user, password);
      yield put(actions.onLoginRequestSucceed());
    } catch (e) {
      yield put(actions.onLoginRequestFailed(e));
    }
  }
}

function* listenLogoutRequests(bity) {
  while (true) { // eslint-disable-line no-constant-condition
    yield take(actions.LOGOUT_REQUESTED);

    const isAuthenticated = yield select(selectors.isAuthenticated);
    const isLoginRequestStarted = yield select(selectors.isLoginRequestStarted);
    if (!isAuthenticated || isLoginRequestStarted) {
      continue; // eslint-disable-line no-continue
    }

    yield call(bity.auth.logout);
  }
}
