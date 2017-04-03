import { EMPTY_DATA } from './constants';
import * as actions from './actions';
import { actions as authActions } from '../../auth';

const initialState = {
  data: EMPTY_DATA,
  outdated: true
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.CHANGED:
      return onChanged(state, action);
    case actions.MARKED_AS_OUTDATED:
      return onOutdated(state, action);
    case authActions.UNAUTHENTICATED:
      return reset(state, action);
    default:
      return state;
  }
}

function onChanged(state, { payload: inputData }) {
  let data;

  if (Array.isArray(inputData)) {
    data = inputData;
  } else {
    data = EMPTY_DATA;
  }

  return { ...state, data, outdated: false };
}

function onOutdated(state) {
  return { ...state, outdated: true };
}

function reset() {
  return { ...initialState };
}
