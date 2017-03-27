import { mountPoint } from './constants';

export function isSignupStarted(state) {
  return state[mountPoint].signupRequest.started === true;
}

export function isSignupSucceed(state) {
  return state[mountPoint].signupRequest.succeed === true;
}

export function isSignupFailed(state) {
  return state[mountPoint].signupRequest.failed === true;
}

export function getSignupFailReason(state) {
  return state[mountPoint].signupRequest.failReason;
}

export function isMounted(state) {
  return state[mountPoint].mounted === true;
}

export function getSuccessfulRegistrationData(state) {
  return state[mountPoint].successfulRegistrationData;
}
