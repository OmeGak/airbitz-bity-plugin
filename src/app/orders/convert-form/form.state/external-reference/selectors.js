import { mountPoint } from '../constants';

export function getExternalReference(state) {
  return state[mountPoint].externalReference;
}
