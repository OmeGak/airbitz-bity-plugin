import * as actions from './actions';

const initialState = {
  request: {
    started: false,
    failed: false
  },
  data: {
    data: null,
    pristine: true
  }
};

export default function conversionRatesReducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.FETCH_STARTED:
      return onRequestStarted(state, action);
    case actions.FETCH_FAILED:
      return onRequestFailed(state, action);
    case actions.FETCH_SUCCEED:
      return onRequestSucceed(state, action);
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

function onRequestFailed(state) {
  return {
    ...state,
    request: {
      started: false,
      failed: true
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
    data: {
      data,
      pristine: false
    }
  };
}
