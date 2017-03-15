import * as actions from './actions';

export default function quotaReducer(state, action) {
  switch (action.type) {
    case actions.QUOTA_CHANGED:
      return onQuotaChanged(state, action);
    default:
      return state;
  }
}

function onQuotaChanged(state, { payload: quota }) {
  return { ...state, quota };
}
