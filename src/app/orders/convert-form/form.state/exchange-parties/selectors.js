import { mountPoint } from '../constants';

// --------------------------
// input
// --------------------------
export function getInputAmount(state) {
  return state[mountPoint].exchangeParties.input.amount;
}

export function getInputSelectedCurrencyCode(state) {
  return state[mountPoint].exchangeParties.input.selectedCurrencyCode;
}

export function getInputCurrencyList(state) {
  return state[mountPoint].exchangeParties.input.currencyList;
}

// --------------------------
// output
// --------------------------
export function getOutputAmount(state) {
  return state[mountPoint].exchangeParties.output.amount;
}

export function getOutputSelectedCurrencyCode(state) {
  return state[mountPoint].exchangeParties.output.selectedCurrencyCode;
}

export function getOutputCurrencyList(state) {
  return state[mountPoint].exchangeParties.output.currencyList;
}
