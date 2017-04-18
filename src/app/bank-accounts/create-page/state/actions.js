import { prefix } from './constants';

export const ADD = `${prefix}::ADD`;
export function add(data) {
  return {
    type: ADD,
    payload: data
  };
}

export const MOUNTED = `${prefix}::MOUNTED`;
export function mounted(router) {
  return {
    type: MOUNTED,
    payload: { router }
  };
}

export const UNMOUNTED = `${prefix}::UNMOUNTED`;
export function unmounted() {
  return {
    type: UNMOUNTED
  };
}

export const PREPARATION_STARTED = `${prefix}::PREPARATION_STARTED`;
export function preparationStarted() {
  return {
    type: PREPARATION_STARTED
  };
}

export const PREPARATION_FAILED = `${prefix}::PREPARATION_FAILED`;
export function preparationFailed() {
  return {
    type: PREPARATION_FAILED
  };
}

export const PREPARATION_COMPLETED = `${prefix}::PREPARATION_COMPLETED`;
export function preparationCompleted() {
  return {
    type: PREPARATION_COMPLETED
  };
}
