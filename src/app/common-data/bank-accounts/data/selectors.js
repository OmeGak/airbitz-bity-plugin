import { mountPoint, EMPTY_DATA } from './constants';

export function getData(state) {
  return state[mountPoint].data;
}

export function hasData(state) {
  return getData(state) !== EMPTY_DATA;
}

export function isOutdated(state) {
  return state[mountPoint].outdated === true;
}
