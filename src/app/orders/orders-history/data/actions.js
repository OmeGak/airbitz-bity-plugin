import { prefix } from './constants';

export const FETCH_REQUESTED = `${prefix}::FETCH_REQUESTED`;
export function fetchOrders(query = {}) {
  return {
    type: FETCH_REQUESTED,
    payload: query
  };
}

export const FETCH_OF_NEXT_PAGE_REQUESTED = `${prefix}::FETCH_OF_NEXT_PAGE_REQUESTED`;
export function fetchNextPage() {
  return {
    type: FETCH_OF_NEXT_PAGE_REQUESTED
  };
}

export const FETCH_OF_PREV_PAGE_REQUESTED = `${prefix}::FETCH_OF_PREV_PAGE_REQUESTED`;
export function fetchPrevPage() {
  return {
    type: FETCH_OF_PREV_PAGE_REQUESTED
  };
}

export const CANCEL = `${prefix}::CANCEL`;
export function cancelFetch() {
  return {
    type: CANCEL
  };
}

export const FETCH_CANCELED = `${prefix}::FETCH_CANCELED`;
export function onFetchCanceled() {
  return {
    type: FETCH_CANCELED
  };
}

export const FETCH_STARTED = `${prefix}::FETCH_STARTED`;
export function onFetchStarted() {
  return {
    type: FETCH_STARTED
  };
}

export const FETCH_SUCCEED = `${prefix}::FETCH_SUCCEED`;
export function onFetchSucceed({ meta, orders, pageIndex }) {
  return {
    type: FETCH_SUCCEED,
    payload: { meta, orders, pageIndex }
  };
}

export const FETCH_FAILED = `${prefix}::FETCH_FAILED`;
export function onFetchFailed() {
  return {
    type: FETCH_FAILED
  };
}

export const HAS_BEEN_RESET = `${prefix}::HAS_BEEN_RESET`;
export function reset() {
  return {
    type: HAS_BEEN_RESET
  };
}

export const REFRESH = `${prefix}::REFRESH`;
export function refresh() {
  return {
    type: REFRESH
  };
}
