import { mountPoint } from '../constants';

export function getAllBankAccounts(state) {
  return state[mountPoint].bankAccounts.all;
}

export function getAvailableAccounts(state) {
  return state[mountPoint].bankAccounts.available;
}

export function hasAvailableAccounts(state) {
  const accounts = getAvailableAccounts(state);
  return Array.isArray(accounts) && accounts.length > 0;
}

export function getSelectedAccountId(state) {
  return state[mountPoint].bankAccounts.selectedId;
}
