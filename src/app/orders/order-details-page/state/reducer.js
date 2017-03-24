import { EMPTY_ORDER_DETAILS } from './constants';
import * as actions from './actions';

const initialState = {
  preparation: {
    started: false,
    failed: false,
    completed: false
  },
  orderDetails: EMPTY_ORDER_DETAILS,
  orderWasCanceled: false
};

export default function orderDetailsPageReducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.PREPARATION_STARTED:
      return onPreparationStarted(state, action);
    case actions.PREPARATION_FAILED:
      return onPreparationFailed(state, action);
    case actions.PREPARATION_COMPLETED:
      return onPreparationCompleted(state, action);
    case actions.ORDER_DETAILS_CHANGED:
      return onOrderDetailsChanged(state, action);
    case actions.ORDER_WAS_CANCELED:
      return onOrderWasCanceled(state, action);
    case actions.RESET:
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

function onOrderDetailsChanged(state, { payload: orderDetails }) {
  return {
    ...state,
    orderDetails
  };
}

function onOrderWasCanceled(state) {
  return {
    ...state,
    orderWasCanceled: true
  };
}

function resetState() {
  return { ...initialState };
}
