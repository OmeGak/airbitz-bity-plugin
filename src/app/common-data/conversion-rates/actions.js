import { prefix } from './constants';

export const ALREADY_HAS_DATA = `${prefix}::ALREADY_HAS_DATA`;
export function alreadyHasData() {
  return {
    type: ALREADY_HAS_DATA
  };
}

export const FETCH_REQUESTED = `${prefix}::FETCH_REQUESTED`;
export function fetchRates() {
  return {
    type: FETCH_REQUESTED
  };
}

export const FETCH_STARTED = `${prefix}::FETCH_STARTED`;
export function fetchStarted() {
  return {
    type: FETCH_STARTED
  };
}

export const FETCH_FAILED = `${prefix}::FETCH_FAILED`;
export function fetchFailed() {
  return {
    type: FETCH_FAILED
  };
}

export const FETCH_SUCCEED = `${prefix}::FETCH_SUCCEED`;
export function fetchSucceed(data) {
  return {
    type: FETCH_SUCCEED,
    payload: data
  };
}
