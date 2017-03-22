import { prefix } from './constants';

export const CREATE = `${prefix}::CREATE`;
export function createOrder(data) {
  return {
    type: CREATE,
    payload: data
  };
}

export const STARTED = `${prefix}::STARTED`;
export function started() {
  return {
    type: STARTED
  };
}

export const CANCELED = `${prefix}::CANCELED`;
export function canceled() {
  return {
    type: CANCELED
  };
}

export const FAILED = `${prefix}::FAILED`;
export function failed(errorKey, errorData) {
  return {
    type: FAILED,
    payload: { errorKey, errorData }
  };
}

export const SUCCEED = `${prefix}::SUCCEED`;
export function succeed(response, exchangeDirection) {
  return {
    type: SUCCEED,
    payload: {
      response,
      exchangeDirection
    }
  };
}
