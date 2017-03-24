import { mountPoint } from './constants';

export function isPreparationStarted(state) {
  return state[mountPoint].preparation.started === true;
}

export function isPreparationFailed(state) {
  return state[mountPoint].preparation.failed === true;
}

export function isPreparationCompleted(state) {
  return state[mountPoint].preparation.completed === true;
}

export function getOrderDetails(state) {
  return state[mountPoint].orderDetails;
}

export function orderWasCanceled(state) {
  return state[mountPoint].orderWasCanceled === true;
}
