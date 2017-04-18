import * as actions from './actions';

const initialState = {
  started: false,
  failed: false,
  failReason: null
};

export default function loadPhoneOperationReducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.STARTED:
      return onStarted(state, action);
    case actions.FAILED:
      return onFailed(state, action);
    case actions.SUCCEED:
      return onSucceed(state, action);
    case actions.CANCELED:
      return onCanceled(state, action);
    default:
      return state;
  }
}

function onStarted() {
  return { ...initialState, started: true };
}

function onFailed(state, { payload: failReason }) {
  return { ...initialState, failed: true, failReason };
}

function onSucceed() {
  return { ...initialState };
}

function onCanceled() {
  return { ...initialState };
}
