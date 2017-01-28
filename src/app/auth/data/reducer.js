import * as actions from './actions';

const EMPTY_FAIL_REASON = null;

const initialState = {
  isAuthenticated: false,
  authRequest: {
    started: false,
    failed: false,
    failReason: EMPTY_FAIL_REASON
  }
};

export default function authReducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.AUTHENTICATED:
      return onAuthenticated(state, action);
    case actions.UNAUTHENTICATED:
      return onUnauthenticated(state, action);
    case actions.ON_LOGIN_REQUEST_STARTED:
      return onLoginRequestStarted(state, action);
    case actions.ON_LOGIN_REQUEST_SUCCEED:
      return onLoginRequestSucceed(state, action);
    case actions.ON_LOGIN_REQUEST_FAILED:
      return onLoginRequestFailed(state, action);
    default:
      return state;
  }
}

function onAuthenticated(state) {
  return {
    ...state,
    isAuthenticated: true
  };
}

function onUnauthenticated(state) {
  return {
    ...state,
    isAuthenticated: false
  };
}

function onLoginRequestStarted(state) {
  return {
    ...state,
    authRequest: {
      ...state.authRequest,
      started: true,
      failed: false,
      failReason: EMPTY_FAIL_REASON
    }
  };
}

function onLoginRequestSucceed(state) {
  return {
    ...state,
    authRequest: {
      ...state.authRequest,
      started: false,
      failed: false,
      failReason: EMPTY_FAIL_REASON
    }
  };
}

function onLoginRequestFailed(state, { meta: failReason }) {
  return {
    ...state,
    authRequest: {
      ...state.authRequest,
      started: false,
      failed: true,
      failReason
    }
  };
}
