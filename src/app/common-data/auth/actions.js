import { prefix } from './constants';

// ==========================
// auth status
// ==========================
export const AUTHENTICATED = `${prefix}::AUTHENTICATED`;
export const UNAUTHENTICATED = `${prefix}::UNAUTHENTICATED`;
export function authStatusChanged(status) {
  return {
    type: status ? AUTHENTICATED : UNAUTHENTICATED
  };
}

// ==========================
// login
// ==========================
export const LOGIN_REQUESTED = `${prefix}::LOGIN_REQUESTED`;
export function login({ user, password }) {
  return {
    type: LOGIN_REQUESTED,
    payload: { user, password }
  };
}

export const ON_LOGIN_REQUEST_STARTED = `${prefix}::ON_LOGIN_REQUEST_STARTED`;
export function onLoginRequestStarted() {
  return {
    type: ON_LOGIN_REQUEST_STARTED
  };
}

export const ON_LOGIN_REQUEST_SUCCEED = `${prefix}::ON_LOGIN_REQUEST_SUCCEED`;
export function onLoginRequestSucceed(data) {
  return {
    type: ON_LOGIN_REQUEST_SUCCEED,
    payload: data
  };
}

export const ON_LOGIN_REQUEST_FAILED = `${prefix}::ON_LOGIN_REQUEST_FAILED`;
export function onLoginRequestFailed(reason) {
  return {
    type: ON_LOGIN_REQUEST_FAILED,
    payload: reason
  };
}

// ==========================
// logout
// ==========================
export const LOGOUT_REQUESTED = `${prefix}::LOGOUT_REQUESTED`;
export function logout() {
  return {
    type: LOGOUT_REQUESTED
  };
}
