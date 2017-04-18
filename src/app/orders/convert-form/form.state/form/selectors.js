import { mountPoint } from '../constants';

export function isMounted(state) {
  return state[mountPoint].form.mounted === true;
}

export function showBankAccounts(state) {
  return state[mountPoint].form.showBankAccounts;
}

export function showExternalReference(state) {
  return state[mountPoint].form.showExternalReference;
}
