import { mountPoint } from './constants';

export function getInputCurrency(state) {
  return state[mountPoint].inputCurrency;
}

export function getInputAmount(state) {
  return state[mountPoint].inputAmount;
}

export function getInputCurrencyList(state) {
  return state[mountPoint].inputCurrencyList;
}

export function getOutputCurrency(state) {
  return state[mountPoint].outputCurrency;
}

export function getOutputAmount(state) {
  return state[mountPoint].outputAmount;
}

export function getOutputCurrencyList(state) {
  return state[mountPoint].outputCurrencyList;
}

export function getInputMinAmount(state) {
  return state[mountPoint].inputMinAmount;
}

export function getInputMaxAmount(state) {
  return state[mountPoint].inputMaxAmount;
}

export function getInputAmountError(state) {
  return state[mountPoint].inputAmountError;
}

export function hasBankAccount(state) {
  return state[mountPoint].hasBankAccount === true;
}

export function canConvert(state) {
  return state[mountPoint].canConvert === true;
}

export function isLoadingOfBankAccountsStarted(state) {
  return state[mountPoint].loadingBankAccounts === true;
}
