import * as actions from './actions';

export default function ratesReducer(state, action) {
  switch (action.type) {
    case actions.RATES_CHANGED:
      return onRatesChanged(state, action);
    default:
      return state;
  }
}

function onRatesChanged(state, { payload: rates }) {
  return { ...state, rates };
}
