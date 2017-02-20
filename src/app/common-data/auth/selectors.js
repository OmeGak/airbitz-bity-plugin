import { mountPoint } from './constants';

export function isAuthenticated(state) {
  return state[mountPoint].isAuthenticated === true;
}

export function isLoginRequestStarted(state) {
  return state[mountPoint].authRequest.started === true;
}
