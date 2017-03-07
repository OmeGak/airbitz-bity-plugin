import * as actions from './actions';

const initialState = {
  data: null,
  hasData: false,
  request: {
    started: false,
    failed: false
  }
};

export default function airbitzWalletsStoreReducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.FETCH_STARTED:
      return onRequestStarted(state, action);
    case actions.FETCH_SUCCEED:
      return onRequestSucceed(state, action);
    case actions.FETCH_FAILED:
      return onRequestFailed(state, action);
    case actions.DATA_CHANGED:
      return onDataChanged(state, action);
    default:
      return state;
  }
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
  let nextState = {
    ...state,
    request: {
      started: false,
      failed: false
    }
  };

  nextState = storeData(nextState, data);

  return nextState;
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

function onDataChanged(state, { payload: data }) {
  return storeData(state, data);
}

function storeData(state, data) {
  return {
    ...state,
    data,
    hasData: true
  };
}
