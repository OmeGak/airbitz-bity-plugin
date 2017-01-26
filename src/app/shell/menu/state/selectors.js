import { mountPoint } from './constants';

export function isOpen(state) {
  return state[mountPoint].isOpen === true;
}
