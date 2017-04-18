import * as actions from './actions';

const EMPTY_FAIL_REASON = null;

const initialState = {
  signupRequest: {
    started: false,
    succeed: false,
    failed: false,
    failReason: EMPTY_FAIL_REASON
  },
  mounted: false,
  successfulRegistrationData: {}
};

export default function signupWidgetReducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.MOUNTED:
      return onMounted(state, action);
    case actions.UNMOUNTED:
      return onUnmounted(state, action);
    case actions.SIGNUP_STARTED:
      return onSignupStarted(state, action);
    case actions.SIGNUP_SUCCEED:
      return onSignupSucceed(state, action);
    case actions.SIGNUP_FAILED:
      return onSignupFailed(state, action);
    case actions.SIGNUP_CANCELED:
      return onSignupCanceled(state, action);
    default:
      return state;
  }
}

function onMounted(state) {
  return { ...state, mounted: true };
}

function onUnmounted() {
  return { ...initialState };
}

function onSignupStarted(state) {
  return {
    ...state,
    signupRequest: {
      ...state.signupRequest,
      started: true
    }
  };
}

function onSignupSucceed(state, { payload }) {
  const { username, phoneNumber, email, password } = payload;

  return {
    ...state,
    signupRequest: {
      ...state.signupRequest,
      started: false,
      succeed: true,
      failed: false,
      failReason: EMPTY_FAIL_REASON
    },
    successfulRegistrationData: { username, phoneNumber, email, password }
  };
}

function onSignupFailed(state, { payload: failReason }) {
  return {
    ...state,
    signupRequest: {
      ...state.signupRequest,
      started: false,
      succeed: false,
      failed: true,
      failReason
    }
  };
}

function onSignupCanceled() {
  return { ...initialState };
}
