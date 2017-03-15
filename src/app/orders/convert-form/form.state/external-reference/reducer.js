import * as actions from './actions';

const MAX_LENGTH = 129;

export default function externalReferenceReducer(state, action) {
  switch (action.type) {
    case actions.EXTERNAL_REFERENCE_CHANGED:
      return onExternalReferenceChanged(state, action);
    default:
      return state;
  }
}

function onExternalReferenceChanged(state, { payload: str }) {
  let externalReference = str;
  if (externalReference.length > MAX_LENGTH) {
    externalReference = externalReference.substr(0, MAX_LENGTH);
  }
  return { ...state, externalReference };
}
