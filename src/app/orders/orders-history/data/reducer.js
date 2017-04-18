import * as actions from './actions';

const initialState = {
  ordersDataIsPristine: true,
  request: {
    started: false,
    failed: false
  },
  orders: [],
  meta: {},
  pageIndex: 0
};

export default function ordersHistoryReducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.HAS_BEEN_RESET:
      return reset(state, action);
    case actions.FETCH_STARTED:
      return onFetchStarted(state, action);
    case actions.FETCH_SUCCEED:
      return onFetchSucceed(state, action);
    case actions.FETCH_FAILED:
      return onFetchFailed(state, action);
    case actions.FETCH_CANCELED:
      return onFetchCanceled(state, action);
    default:
      return state;
  }
}

function reset() {
  return { ...initialState };
}

function onFetchStarted(state) {
  return {
    ...state,
    request: {
      started: true,
      failed: false
    }
  };
}

function onFetchSucceed(state, action) {
  const { payload: { meta, orders, pageIndex } } = action;
  return {
    ...state,
    ordersDataIsPristine: false,
    request: {
      started: false,
      failed: false
    },
    pageIndex,
    orders,
    meta
  };
}

function onFetchFailed(state) {
  return {
    ...state,
    request: {
      started: false,
      failed: true
    }
  };
}

function onFetchCanceled(state) {
  return {
    ...state,
    request: {
      started: false,
      failed: false
    }
  };
}
