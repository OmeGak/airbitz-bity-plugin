import { prefix } from './constants';

export const REGISTER = `${prefix}::REGISTER`;
export function register(phoneNumber, userId) {
  return {
    type: REGISTER,
    payload: { phoneNumber, userId }
  };
}

export const STARTED = `${prefix}::STARTED`;
export function started() {
  return {
    type: STARTED
  };
}

export const FAILED = `${prefix}::FAILED`;
export function failed(reason) {
  return {
    type: FAILED,
    payload: reason
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
