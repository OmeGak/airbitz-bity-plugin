import { prefix } from '../constants';

export const EXTERNAL_REFERENCE_CHANGED = `${prefix}::EXTERNAL_REFERENCE_CHANGED`;
export function externalReferenceChanged(v) {
  return {
    type: EXTERNAL_REFERENCE_CHANGED,
    payload: v
  };
}
