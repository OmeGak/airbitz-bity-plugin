import { prefix } from './constants';

export const SHOW = `${prefix}::SHOW`;
export function show() {
  return {
    type: SHOW
  };
}

export const HIDE = `${prefix}::HIDE`;
export function hide() {
  return {
    type: HIDE
  };
}

export const TOGGLE = `${prefix}::TOGGLE`;
export function toggle() {
  return {
    type: TOGGLE
  };
}

export const STATE_CHANGED = `${prefix}::STATE_CHANGED`;
export function onStateChange(v) {
  return {
    type: STATE_CHANGED,
    payload: v
  };
}
