import * as actions from './actions';

const initialState = {
  data: {
    userName: '',
    email: ''
  },
  hasData: false,
  request: {
    started: false,
    failed: false
  }
};

export default function accountInfoReducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.ACCOUNT_INFO_HAS_BEEN_RESET:
      return onReset(state, action);
    case actions.ACCOUNT_INFO_LOADING_STARTED:
      return onLoadingStarted(state, action);
    case actions.ACCOUNT_INFO_LOADING_FAILED:
      return onLoadingFailed(state, action);
    case actions.ACCOUNT_INFO_LOADING_SUCCEED:
      return onLoadingSucceed(state, action);
    case actions.ACCOUNT_INFO_LOADING_CANCELED:
      return onLoadingCanceled(state, action);
    default:
      return state;
  }
}

function onReset() {
  return { ...initialState };
}

function onLoadingStarted(state) {
  return {
    ...state,
    data: { ...initialState.data },
    hasData: false,
    request: {
      started: true,
      failed: false
    }
  };
}

function onLoadingFailed(state) {
  return {
    ...state,
    request: {
      started: false,
      failed: true
    }
  };
}

function onLoadingSucceed(state, action) {
  const { payload: data } = action;
  return {
    ...state,
    data,
    hasData: true,
    request: {
      started: false,
      failed: false
    }
  };
}

function onLoadingCanceled(state) {
  return {
    ...state,
    request: {
      started: false,
      failed: false
    }
  };
}
