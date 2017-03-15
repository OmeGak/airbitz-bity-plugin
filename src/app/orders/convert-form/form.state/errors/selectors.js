import { mountPoint } from '../constants';

export function getInputErrors(state) {
  return state[mountPoint].errors.input;
}

export function getBankAccountsErrors(state) {
  return state[mountPoint].errors.bankAccounts;
}

export function getExternalReferenceErrors(state) {
  return state[mountPoint].errors.externalReference;
}

export function formIsValid(state) {
  return state[mountPoint].errors.form.invalid === false;
}
