import { prefix } from './constants';

export const FETCH_DATA = `${prefix}::FETCH_DATA`;
export function fetchData() {
  return {
    type: FETCH_DATA
  };
}

export const FETCH_STARTED = `${prefix}::FETCH_STARTED`;
export function fetchStarted() {
  return {
    type: FETCH_STARTED
  };
}

export const FETCH_FAILED = `${prefix}::FETCH_FAILED`;
export function fetchFailed(error) {
  return {
    type: FETCH_FAILED,
    payload: error
  };
}

export const FETCH_SUCCEED = `${prefix}::FETCH_SUCCEED`;
export function fetchSucceed(data) {
  return {
    type: FETCH_SUCCEED,
    payload: data
  };
}

export const ALREADY_HAS_DATA = `${prefix}::ALREADY_HAS_DATA`;
export function alreadyHasData() {
  return {
    type: ALREADY_HAS_DATA
  };
}

export const DATA_CHANGED = `${prefix}::DATA_CHANGED`;
export function dataChanged(data) {
  return {
    type: DATA_CHANGED,
    payload: data
  };
}
