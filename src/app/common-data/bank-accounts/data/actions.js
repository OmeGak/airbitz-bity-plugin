import { prefix } from './constants';

export const CHANGED = `${prefix}::CHANGED`;
export function changed(data) {
  return {
    type: CHANGED,
    payload: data
  };
}

export const MARKED_AS_OUTDATED = `${prefix}::MARKED_AS_OUTDATED`;
export function outdated() {
  return {
    type: MARKED_AS_OUTDATED
  };
}
