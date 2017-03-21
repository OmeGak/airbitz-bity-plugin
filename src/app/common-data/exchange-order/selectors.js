import {
  mountPoint,
  NO_ERROR,
  NO_DATA,
  AIRBITZ_WALLET_ERROR_KEY,
  AIRBITZ_PUBLIC_ADDRESS_ERROR_KEY,
  REQUEST_ERROR_KEY
} from './constants';

export function isStarted(state) {
  return state[mountPoint].started === true;
}

export function getAirbitzWalletError(state) {
  return state[mountPoint].errors[AIRBITZ_WALLET_ERROR_KEY];
}

export function hasAirbitzWalletError(state) {
  return getAirbitzWalletError(state) !== NO_ERROR;
}

export function getAirbitzPublicAddressError(state) {
  return state[mountPoint].errors[AIRBITZ_PUBLIC_ADDRESS_ERROR_KEY];
}

export function hasAirbitzPublicAddressError(state) {
  return getAirbitzPublicAddressError(state) !== NO_ERROR;
}

export function getRequestError(state) {
  return state[mountPoint].errors[REQUEST_ERROR_KEY];
}

export function hasRequestError(state) {
  return getRequestError(state) !== NO_ERROR;
}

export function hasError(state) {
  return hasAirbitzWalletError(state) || hasAirbitzPublicAddressError(state) || hasRequestError(state);
}

export function getData(state) {
  return state[mountPoint].data;
}

export function hasData(state) {
  return getData(state) !== NO_DATA;
}
