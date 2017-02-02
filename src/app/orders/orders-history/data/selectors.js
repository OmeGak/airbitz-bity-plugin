import { mountPoint } from './constants';

export function isPristine(state) {
  return state[mountPoint].ordersDataIsPristine === true;
}

export function isFetchStarted(state) {
  return state[mountPoint].request.started === true;
}

export function isFetchFailed(state) {
  return state[mountPoint].request.failed === true;
}

export function getOrders(state) {
  return state[mountPoint].orders;
}

export function hasPrevPage(state) {
  return state[mountPoint].meta.hasPrevPage === true;
}

export function hasNextPage(state) {
  return state[mountPoint].meta.hasNextPage === true;
}

export function getPageIndex(state) {
  return state[mountPoint].pageIndex;
}
