import { prefix } from './constants';

export const ADD = `${prefix}::ADD`;
export function add(data, userId) {
  return {
    type: ADD,
    payload: {
      data,
      userId
    }
  };
}

export const STARTED = `${prefix}::STARTED`;
export function started() {
  return {
    type: STARTED
  };
}

export const FAILED = `${prefix}::FAILED`;
export function failed() {
  return {
    type: FAILED
  };
}

export const SUCCEED = `${prefix}::SUCCEED`;
export function succeed() {
  return {
    type: SUCCEED
  };
}

export const CANCELED = `${prefix}::CANCELED`;
export function canceled() {
  return {
    type: CANCELED
  };
}
