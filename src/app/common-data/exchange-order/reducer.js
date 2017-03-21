import * as actions from './actions';
import {
  NO_ERROR,
  NO_DATA,
  AIRBITZ_WALLET_ERROR_KEY,
  AIRBITZ_PUBLIC_ADDRESS_ERROR_KEY,
  REQUEST_ERROR_KEY
} from './constants';

const initialState = {
  started: false,
  errors: {
    [AIRBITZ_WALLET_ERROR_KEY]: NO_ERROR,
    [AIRBITZ_PUBLIC_ADDRESS_ERROR_KEY]: NO_ERROR,
    [REQUEST_ERROR_KEY]: NO_ERROR
  },
  data: NO_DATA
};

export default function exchangeOrderReducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.STARTED:
      return onStarted(state, action);
    case actions.CANCELED:
      return onCanceled(state, action);
    case actions.FAILED:
      return onFailed(state, action);
    case actions.SUCCEED:
      return onSucceed(state, action);
    default:
      return state;
  }
}

function onStarted() {
  return {
    ...initialState,
    started: true
  };
}

function onCanceled() {
  return { ...initialState };
}

function onFailed(state, { payload }) {
  const { errorKey, errorData } = payload;
  return {
    ...initialState,
    errors: {
      ...initialState.errors,
      [errorKey]: errorData
    }
  };
}

function onSucceed(state, { payload }) {
  return {
    ...initialState,
    data: payload
  };
}
