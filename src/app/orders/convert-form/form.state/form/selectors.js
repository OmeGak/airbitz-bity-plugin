import { mountPoint } from '../constants';

export function showBankAccounts(state) {
  return state[mountPoint].form.showBankAccounts;
}

export function showExternalReference(state) {
  return state[mountPoint].form.showExternalReference;
}

export function isSubmiting(state) {
  return state[mountPoint].form.submitting;
}
