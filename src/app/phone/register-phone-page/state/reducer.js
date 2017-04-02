import * as actions from './actions';

const initialState = {
  preparation: {
    started: false,
    failed: false,
    completed: false
  }
};

export default function registerPhonePageReducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.PREPARATION_STARTED:
      return onPreparationStarted(state, action);
    case actions.PREPARATION_FAILED:
      return onPreparationFailed(state, action);
    case actions.PREPARATION_COMPLETED:
      return onPreparationCompleted(state, action);
    case actions.UNMOUNTED:
      return resetState(state, action);
    default:
      return state;
  }
}

function onPreparationStarted(state) {
  return {
    ...state,
    preparation: {
      started: true,
      failed: false,
      completed: false
    }
  };
}

function onPreparationFailed(state) {
  return {
    ...state,
    preparation: {
      started: false,
      failed: true,
      completed: false
    }
  };
}

function onPreparationCompleted(state) {
  return {
    ...state,
    preparation: {
      started: false,
      failed: false,
      completed: true
    }
  };
}

function resetState() {
  return { ...initialState };
}
