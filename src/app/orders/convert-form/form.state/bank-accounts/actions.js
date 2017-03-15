import { prefix } from '../constants';

export const ALL_ACCOUNTS_CHANGED = `${prefix}::ALL_ACCOUNTS_CHANGED`;
export function allAccountsChanged(data) {
  return {
    type: ALL_ACCOUNTS_CHANGED,
    payload: data
  };
}

export const AVAILABLE_ACCOUNTS_CHANGED = `${prefix}::AVAILABLE_ACCOUNTS_CHANGED`;
export function availableAccountsChanged(data) {
  return {
    type: AVAILABLE_ACCOUNTS_CHANGED,
    payload: data
  };
}

export const SELECTED_ACCOUNT_ID_CHANGED = `${prefix}::SELECTED_ACCOUNT_ID_CHANGED`;
export function selectedAccountIdChanged(id) {
  return {
    type: SELECTED_ACCOUNT_ID_CHANGED,
    payload: id
  };
}

export const REFRESH_REQUESTED = `${prefix}::REFRESH_REQUESTED`;
export function refresh() {
  return {
    type: REFRESH_REQUESTED
  };
}

export const REFRESH_STARTED = `${prefix}::REFRESH_STARTED`;
export function refreshStarted() {
  return {
    type: REFRESH_STARTED
  };
}

export const REFRESH_FINISHED = `${prefix}::REFRESH_FINISHED`;
export function refreshFinished() {
  return {
    type: REFRESH_FINISHED
  };
}
