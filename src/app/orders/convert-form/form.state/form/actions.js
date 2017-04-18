import { prefix } from '../constants';

export const MOUNTED = `${prefix}::MOUNTED`;
export function mounted() {
  return {
    type: MOUNTED
  };
}

export const UNMOUNTED = `${prefix}::UNMOUNTED`;
export function unmounted() {
  return {
    type: UNMOUNTED
  };
}

export const SETUP_INITIAL_STATE_DATA = `${prefix}::SETUP_INITIAL_STATE_DATA`;
export function setupInitialStateData(data) {
  return {
    type: SETUP_INITIAL_STATE_DATA,
    payload: data
  };
}

export const SUBMIT = `${prefix}::SUBMIT`;
export function submit(router) {
  return {
    type: SUBMIT,
    payload: router
  };
}

export const RESET = `${prefix}::RESET`;
export function reset() {
  return {
    type: RESET
  };
}
