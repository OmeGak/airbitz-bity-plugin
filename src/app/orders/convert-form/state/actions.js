import { prefix } from './constants';

export const MOUNTED = `${prefix}::MOUNTED`;
export function mounted() {
  return {
    type: MOUNTED
  };
}

export const UNMOUNTED = `${prefix}::UNMOUNTED`;
export function unmounted() {
  return {
    type: UNMOUNTED
  };
}

export const BULK_UPDATE = `${prefix}::BULK_UPDATE`;
export function bulkUpdate(data) {
  const {
    ratesData = null,
    quotaData = null,
    bankAccountsData = null
  } = data;

  return {
    type: BULK_UPDATE,
    payload: {
      ratesData,
      quotaData,
      bankAccountsData
    }
  };
}

export const RESET = `${prefix}::RESET`;
export function reset() {
  return {
    type: RESET
  };
}

export const INPUT_AMOUNT_CHANGED = `${prefix}::INPUT_AMOUNT_CHANGED`;
export function inputAmountChanged(v) {
  return {
    type: INPUT_AMOUNT_CHANGED,
    payload: v
  };
}

export const OUTPUT_AMOUNT_CHANGED = `${prefix}::OUTPUT_AMOUNT_CHANGED`;
export function outputAmountChanged(v) {
  return {
    type: OUTPUT_AMOUNT_CHANGED,
    payload: v
  };
}

export const INPUT_CURRENCY_CHANGED = `${prefix}::INPUT_CURRENCY_CHANGED`;
export function inputCurrencyChanged(currencyId) {
  return {
    type: INPUT_CURRENCY_CHANGED,
    payload: currencyId
  };
}

export const OUTPUT_CURRENCY_CHANGED = `${prefix}::OUTPUT_CURRENCY_CHANGED`;
export function outputCurrencyChanged(currencyId) {
  return {
    type: OUTPUT_CURRENCY_CHANGED,
    payload: currencyId
  };
}

export const EXCHANGE_PARTIES_ARE_REVERSED = `${prefix}::EXCHANGE_PARTIES_ARE_REVERSED`;
export function swapParties() {
  return {
    type: EXCHANGE_PARTIES_ARE_REVERSED
  };
}

export const RATES_CHANGED = `${prefix}::RATES_CHANGED`;
export function ratesChanged(data) {
  return {
    type: RATES_CHANGED,
    payload: data
  };
}

export const QUOTA_CHANGED = `${prefix}::QUOTA_CHANGED`;
export function quotaChanged(data) {
  return {
    type: QUOTA_CHANGED,
    payload: data
  };
}

export const BANK_ACCOUNTS_CHANGED = `${prefix}::BANK_ACCOUNTS_CHANGED`;
export function bankAccountsChanged(data) {
  return {
    type: BANK_ACCOUNTS_CHANGED,
    payload: data
  };
}

export const RELOAD_BANK_ACCOUNTS = `${prefix}::RELOAD_BANK_ACCOUNTS`;
export function reloadBankAccounts() {
  return {
    type: RELOAD_BANK_ACCOUNTS
  };
}

export const LOADING_OF_BANK_ACCOUNTS_STARTED = `${prefix}::LOADING_OF_BANK_ACCOUNTS_STARTED`;
export function loadingOfBankAccountsStarted() {
  return {
    type: LOADING_OF_BANK_ACCOUNTS_STARTED
  };
}

export const LOADING_OF_BANK_ACCOUNTS_FINISHED = `${prefix}::LOADING_OF_BANK_ACCOUNTS_FINISHED`;
export function loadingOfBankAccountsFinished() {
  return {
    type: LOADING_OF_BANK_ACCOUNTS_FINISHED
  };
}
