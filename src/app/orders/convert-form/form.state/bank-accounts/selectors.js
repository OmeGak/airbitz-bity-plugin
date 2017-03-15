import { mountPoint } from '../constants';

export function getAvailableAccounts(state) {
  return state[mountPoint].bankAccounts.available;
}

export function getSelectedAccountId(state) {
  return state[mountPoint].bankAccounts.selectedId;
}

export function isRefreshStarted(state) {
  return state[mountPoint].bankAccounts.loading;
}
