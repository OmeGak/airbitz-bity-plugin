import { mountPoint } from './constants';

export function isStarted(state) {
  return state[mountPoint].started === true;
}

export function isFailed(state) {
  return state[mountPoint].failed === true;
}

export function getFailReason(state) {
  return state[mountPoint].failReason;
}
