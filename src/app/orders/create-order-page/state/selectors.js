import { mountPoint } from './constants';

export function isReady(state) {
  return state[mountPoint].ready === true;
}
