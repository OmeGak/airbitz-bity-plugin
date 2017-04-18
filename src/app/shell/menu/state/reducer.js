import * as actions from './actions';

const initialState = {
  isOpen: false
};

export default function sidebarMenuReducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.SHOW:
      return {
        ...state,
        isOpen: true
      };
    case actions.HIDE:
      return {
        ...state,
        isOpen: false
      };
    case actions.TOGGLE:
      return {
        ...state,
        isOpen: !state.isOpen
      };
    case actions.STATE_CHANGED:
      return onStateChanged(state, action);
    default:
      return state;
  }
}

function onStateChanged(state, action) {
  const { payload: isOpen } = action;
  return {
    ...state,
    isOpen
  };
}
