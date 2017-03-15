import { prefix } from '../constants';

export const QUOTA_CHANGED = `${prefix}::QUOTA_CHANGED`;
export function quotaChanged(data) {
  return {
    type: QUOTA_CHANGED,
    payload: data
  };
}
