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
