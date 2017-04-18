import { prefix } from './constants';

export const ACCOUNT_INFO_REQUESTED = `${prefix}::ACCOUNT_INFO_REQUESTED`;
export function fetchAccountInfo() {
  return {
    type: ACCOUNT_INFO_REQUESTED
  };
}

export const ACCOUNT_INFO_LOADING_STARTED = `${prefix}::ACCOUNT_INFO_LOADING_STARTED`;
export function accountInfoLoadingStarted() {
  return {
    type: ACCOUNT_INFO_LOADING_STARTED
  };
}

export const ACCOUNT_INFO_LOADING_SUCCEED = `${prefix}::ACCOUNT_INFO_LOADING_SUCCEED`;
export function accountInfoLoadingSucceed(data) {
  return {
    type: ACCOUNT_INFO_LOADING_SUCCEED,
    payload: data
  };
}

export const ACCOUNT_INFO_LOADING_FAILED = `${prefix}::ACCOUNT_INFO_LOADING_FAILED`;
export function accountInfoLoadingFailed(reason) {
  return {
    type: ACCOUNT_INFO_LOADING_FAILED,
    payload: reason
  };
}

export const ACCOUNT_INFO_LOADING_CANCELED = `${prefix}::ACCOUNT_INFO_LOADING_CANCELED`;
export function accountInfoLoadingCanceled() {
  return {
    type: ACCOUNT_INFO_LOADING_CANCELED
  };
}

export const ACCOUNT_INFO_HAS_BEEN_RESET = `${prefix}::ACCOUNT_INFO_HAS_BEEN_RESET`;
export function resetAccountInfo() {
  return {
    type: ACCOUNT_INFO_HAS_BEEN_RESET
  };
}

export const ALREADY_HAS_DATA = `${prefix}::ALREADY_HAS_DATA`;
export function alreadyHasData() {
  return {
    type: ALREADY_HAS_DATA
  };
}
