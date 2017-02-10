import { mountPoint } from './constants';

export function isRequestStarted(state) {
  return state[mountPoint].request.started === true;
}

export function isRequestFailed(state) {
  return state[mountPoint].request.failed === true;
}

export function hasPristineData(state) {
  return state[mountPoint].data.pristine === true;
}

export function getData(state) {
  return state[mountPoint].data.data;
}
