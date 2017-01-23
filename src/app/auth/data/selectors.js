import { MOUNT_POINT } from './constants';

export function isAuthenticated(state) {
  return state[MOUNT_POINT].isAuthenticated === true;
}

export function isLoginRequestStarted(state) {
  return state[MOUNT_POINT].authRequest.started === true;
}
