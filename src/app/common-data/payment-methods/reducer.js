import * as actions from './actions';

const initialState = {
  data: null,
  hasData: false,
  request: {
    started: false,
    failed: false
  }
};

export default function paymentMethodsStoreReducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.RESET:
      return reset(state, action);
    case actions.FETCH_STARTED:
      return onRequestStarted(state, action);
    case actions.FETCH_SUCCEED:
      return onRequestSucceed(state, action);
    case actions.FETCH_FAILED:
      return onRequestFailed(state, action);
    default:
      return state;
  }
}

function reset() {
  return { ...initialState };
}

function onRequestStarted(state) {
  return {
    ...state,
    request: {
      started: true,
      failed: false
    }
  };
}

function onRequestSucceed(state, { payload: data }) {
  return {
    ...state,
    request: {
      started: false,
      failed: false
    },
    data,
    hasData: true
  };
}

function onRequestFailed(state) {
  return {
    ...state,
    request: {
      started: false,
      failed: true
    }
  };
}
