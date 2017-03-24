import { prefix } from './constants';

export const MOUNTED = `${prefix}::MOUNTED`;
export function mounted(orderId) {
  return {
    type: MOUNTED,
    payload: orderId
  };
}

export const UNMOUNTED = `${prefix}::UNMOUNTED`;
export function unmounted() {
  return {
    type: UNMOUNTED
  };
}

export const RESET = `${prefix}::RESET`;
export function reset() {
  return {
    type: RESET
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
export function preparationCompleted(orderDetails) {
  return {
    type: PREPARATION_COMPLETED,
    payload: orderDetails
  };
}

export const ORDER_DETAILS_CHANGED = `${prefix}::ORDER_DETAILS_CHANGED`;
export function orderDetailsChanged(orderDetails) {
  return {
    type: ORDER_DETAILS_CHANGED,
    payload: orderDetails
  };
}

export const CANCEL_ORDER = `${prefix}::CANCEL_ORDER`;
export function cancelOrder(orderId) {
  return {
    type: CANCEL_ORDER,
    payload: orderId
  };
}

export const ORDER_WAS_CANCELED = `${prefix}::ORDER_WAS_CANCELED`;
export function orderWasCanceled() {
  return {
    type: ORDER_WAS_CANCELED
  };
}
