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

// ==========================
// renew token
// ==========================
export const REFRESH_TOKEN = `${prefix}::REFRESH_TOKEN`;
export function refreshToken() {
  return {
    type: REFRESH_TOKEN
  };
}

export const REFRESH_TOKEN_STARTED = `${prefix}::REFRESH_TOKEN_STARTED`;
export function refreshTokenStarted() {
  return {
    type: REFRESH_TOKEN_STARTED
  };
}

export const REFRESH_TOKEN_SUCCEED = `${prefix}::REFRESH_TOKEN_SUCCEED`;
export function refreshTokenSucceed() {
  return {
    type: REFRESH_TOKEN_SUCCEED
  };
}

export const REFRESH_TOKEN_FAILED = `${prefix}::REFRESH_TOKEN_FAILED`;
export function refreshTokenFailed() {
  return {
    type: REFRESH_TOKEN_FAILED
  };
}

export const REFRESH_TOKEN_CANCELED = `${prefix}::REFRESH_TOKEN_CANCELED`;
export function refreshTokenCanceled() {
  return {
    type: REFRESH_TOKEN_CANCELED
  };
}
