import { mountPoint } from '../constants';

export function getAllBankAccounts(state) {
  return state[mountPoint].bankAccounts.all;
}

export function getAvailableAccounts(state) {
  return state[mountPoint].bankAccounts.available;
}

export function getSelectedAccountId(state) {
  return state[mountPoint].bankAccounts.selectedId;
}

export function isRefreshStarted(state) {
  return state[mountPoint].bankAccounts.loading;
}
