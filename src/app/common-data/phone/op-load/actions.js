import { prefix } from './constants';

export const LOAD = `${prefix}::LOAD`;
export function load(skipCache = false) {
  return {
    type: LOAD,
    payload: skipCache
  };
}

export const CACHED = `${prefix}::CACHED`;
export function cached() {
  return {
    type: CACHED
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
