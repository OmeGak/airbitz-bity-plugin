import { prefix } from './constants';

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

export const SIGNUP_REQUESTED = `${prefix}::SIGNUP_REQUESTED`;
export function signup(formData) {
  return {
    type: SIGNUP_REQUESTED,
    payload: formData
  };
}

export const SIGNUP_STARTED = `${prefix}::SIGNUP_STARTED`;
export function signupStarted() {
  return {
    type: SIGNUP_STARTED
  };
}

export const SIGNUP_SUCCEED = `${prefix}::SIGNUP_SUCCEED`;
export function signupSucceed(formData) {
  return {
    type: SIGNUP_SUCCEED,
    payload: formData
  };
}

export const SIGNUP_FAILED = `${prefix}::SIGNUP_FAILED`;
export function signupFailed(reason) {
  return {
    type: SIGNUP_FAILED,
    payload: reason
  };
}

export const SIGNUP_CANCELED = `${prefix}::SIGNUP_FAILED`;
export function signupCanceled() {
  return {
    type: SIGNUP_CANCELED
  };
}
