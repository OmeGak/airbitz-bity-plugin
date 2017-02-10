import * as actions from './actions';

const initialState = {
  ready: false
};

export default function createOrderPageReducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.UNMOUNTED:
      return onUnmounted(state, action);
    case actions.READY:
      return onReady(state, action);
    default:
      return state;
  }
}

function onUnmounted() {
  return { ...initialState };
}

function onReady(state) {
  return {
    ...state,
    ready: true
  };
}
