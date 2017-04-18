import { mountPoint, EMPTY_PHONE } from './constants';

export function getData(state) {
  return state[mountPoint].data;
}

export function hasData(state) {
  return getData(state) !== EMPTY_PHONE;
}

export function isOutdated(state) {
  return state[mountPoint].outdated === true;
}
