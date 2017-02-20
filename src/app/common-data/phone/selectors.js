import { mountPoint } from './constants';

export function hasData(state) {
  return state[mountPoint].hasData === true;
}

export function getData(state) {
  return state[mountPoint].data;
}

export function isRequestStarted(state) {
  return state[mountPoint].request.started === true;
}

export function isRequestFailed(state) {
  return state[mountPoint].request.failed === true;
}
