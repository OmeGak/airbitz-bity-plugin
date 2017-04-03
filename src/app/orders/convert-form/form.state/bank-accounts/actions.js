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
