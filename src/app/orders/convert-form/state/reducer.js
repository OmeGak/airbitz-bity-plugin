import * as actions from './actions';
import { currencies, inputAmountValidationErrors } from './constants';
import * as utils from './utils';

const EMPTY_AMOUNT = '';
const EMPTY_AMOUNT_LIMIT = NaN;

const currencyListA = [
  currencies.EUR,
  currencies.CHF
];

const currencyListB = [
  currencies.BTC
];

const initialState = {
  inputAmount: EMPTY_AMOUNT,
  inputCurrency: currencyListA[0],
  inputCurrencyList: currencyListA,

  inputMinAmount: NaN,
  inputMaxAmount: NaN,
  inputAmountError: inputAmountValidationErrors.NONE,

  outputAmount: EMPTY_AMOUNT,
  outputCurrency: currencyListB[0],
  outputCurrencyList: currencyListB,

  quotaData: null,
  ratesData: null,

  bankAccountsData: null,
  hasBankAccount: true,
  loadingBankAccounts: false,

  canConvert: false
};

export default function convertFormReducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.RESET:
      return onReset(state, action);
    case actions.BULK_UPDATE:
      return onBulkUpdate(state, action);
    case actions.INPUT_AMOUNT_CHANGED:
      return onInputAmountChanged(state, action);
    case actions.OUTPUT_AMOUNT_CHANGED:
      return onOutputAmountChanged(state, action);
    case actions.INPUT_CURRENCY_CHANGED:
      return onInputCurrencyChanged(state, action);
    case actions.OUTPUT_CURRENCY_CHANGED:
      return onOutputCurrencyChanged(state, action);
    case actions.EXCHANGE_PARTIES_ARE_REVERSED:
      return onSwapParties(state, action);
    case actions.RATES_CHANGED:
      return onRatesDataChanged(state, action);
    case actions.QUOTA_CHANGED:
      return onQuotaDataChanged(state, action);
    case actions.BANK_ACCOUNTS_CHANGED:
      return onBankAccountsChanged(state, action);
    case actions.LOADING_OF_BANK_ACCOUNTS_STARTED:
      return onLoadingOfBankAccountsStarted(state, action);
    case actions.LOADING_OF_BANK_ACCOUNTS_FINISHED:
      return onLoadingOfBankAccountsFinished(state, action);
    default:
      return state;
  }
}

function onReset() {
  return { ...initialState };
}

function onBulkUpdate(state, { payload }) {
  const {
    ratesData,
    quotaData,
    bankAccountsData
  } = payload;

  let nextState = { ...state };

  if (typeof ratesData !== 'undefined') {
    nextState = storeRatesData(nextState, ratesData);
  }

  if (typeof quotaData !== 'undefined') {
    nextState = storeQuotaData(nextState, quotaData);
  }

  if (typeof bankAccountsData !== 'undefined') {
    nextState = storeBankAccountsData(nextState, bankAccountsData);
  }

  nextState = calculateAndUpdateOutputAmount(nextState);
  nextState = updateInputAmountLimits(nextState);
  nextState = validateInputAmount(nextState);
  nextState = validateBankAccount(nextState);
  nextState = validateForm(nextState);

  return nextState;
}

function onInputAmountChanged(state, { payload: inputAmount }) {
  let nextState = storeInputAmount(state, inputAmount);

  nextState = calculateAndUpdateOutputAmount(nextState);
  nextState = updateInputAmountLimits(nextState);
  nextState = validateInputAmount(nextState);
  nextState = validateForm(nextState);

  return nextState;
}

function onOutputAmountChanged(state, { payload: outputAmount }) {
  let nextState = storeOutputAmount(state, outputAmount);

  nextState = calculateAndUpdateInputAmount(nextState);
  nextState = updateInputAmountLimits(nextState);
  nextState = validateInputAmount(nextState);
  nextState = validateForm(nextState);

  return nextState;
}

function onInputCurrencyChanged(state, { payload: currencyId }) {
  const inputCurrency = Object.keys(currencies)
    .map(key => currencies[key])
    .filter(({ id }) => id === currencyId)[0];

  let nextState = storeInputCurrency(state, inputCurrency);

  nextState = calculateAndUpdateOutputAmount(nextState);
  nextState = updateInputAmountLimits(nextState);
  nextState = validateInputAmount(nextState);
  nextState = validateBankAccount(nextState);
  nextState = validateForm(nextState);

  return nextState;
}

function onOutputCurrencyChanged(state, { payload: currencyId }) {
  const outputCurrency = Object.keys(currencies)
    .map(key => currencies[key])
    .filter(({ id }) => id === currencyId)[0];

  let nextState = storeOutputCurrency(state, outputCurrency);

  nextState = calculateAndUpdateOutputAmount(nextState);
  nextState = validateBankAccount(nextState);
  nextState = validateForm(nextState);

  return nextState;
}

function onSwapParties(state) {
  let nextState = swapParties(state);

  nextState = calculateAndUpdateOutputAmount(nextState);
  nextState = updateInputAmountLimits(nextState);
  nextState = validateInputAmount(nextState);
  nextState = validateBankAccount(nextState);
  nextState = validateForm(nextState);

  return nextState;
}

function onRatesDataChanged(state, { payload: ratesData }) {
  let nextState = storeRatesData(state, ratesData);

  nextState = calculateAndUpdateOutputAmount(nextState);
  nextState = updateInputAmountLimits(nextState);
  nextState = validateInputAmount(nextState);
  nextState = validateForm(nextState);

  return nextState;
}

function onQuotaDataChanged(state, { payload: quotaData }) {
  let nextState = storeQuotaData(state, quotaData);

  nextState = updateInputAmountLimits(nextState);
  nextState = validateInputAmount(nextState);
  nextState = validateForm(nextState);

  return nextState;
}

function onBankAccountsChanged(state, { payload: bankAccountsData }) {
  let nextState = storeBankAccountsData(state, bankAccountsData);

  nextState = validateBankAccount(nextState);
  nextState = validateForm(nextState);

  return nextState;
}

function onLoadingOfBankAccountsStarted(state) {
  return { ...state, loadingBankAccounts: true };
}

function onLoadingOfBankAccountsFinished(state) {
  return { ...state, loadingBankAccounts: false };
}

function storeInputAmount(state, inputAmount) {
  return { ...state, inputAmount };
}

function storeOutputAmount(state, outputAmount) {
  return { ...state, outputAmount };
}

function storeInputCurrency(state, inputCurrency) {
  return {
    ...state,
    inputCurrency
  };
}

function storeOutputCurrency(state, outputCurrency) {
  return {
    ...state,
    outputCurrency
  };
}

function swapParties(state) {
  const {
    inputCurrency: prevInputCurrency,
    outputCurrency: prevOutputCurrency,
    inputCurrencyList: prevInputCurrencyList,
    outputCurrencyList: prevOutputCurrencyList,
    outputAmount: prevOutputAmount
  } = state;

  const inputAmount = prevOutputAmount;
  const inputCurrency = prevOutputCurrency;
  const inputCurrencyList = prevOutputCurrencyList;

  const outputCurrency = prevInputCurrency;
  const outputCurrencyList = prevInputCurrencyList;
  const outputAmount = '';

  return {
    ...state,
    inputAmount,
    inputCurrency,
    inputCurrencyList,
    outputCurrency,
    outputCurrencyList,
    outputAmount
  };
}

function storeRatesData(state, ratesData) {
  return { ...state, ratesData };
}

function storeQuotaData(state, quotaData) {
  return { ...state, quotaData };
}

function calculateAndUpdateInputAmount(state) {
  const { ratesData, inputCurrency, outputCurrency, outputAmount: rawOutputAmount } = state;

  const outputAmount = parseFloat(rawOutputAmount);
  if (isNaN(outputAmount) || outputAmount < 0) {
    return storeInputAmount(state, EMPTY_AMOUNT);
  }

  let inputAmount = utils.calcInputAmount(ratesData, inputCurrency.id, outputCurrency.id, outputAmount);

  const isFiatCurrency = utils.isFiatCurrency(inputCurrency.id);
  const isCryptoCurrency = utils.isCryptoCurrency(inputCurrency.id);

  if (isFiatCurrency) {
    inputAmount = utils.normalizeFiatCurrencyAmount(inputAmount);
  } else if (isCryptoCurrency) {
    inputAmount = utils.normalizeCryptoCurrencyAmount(inputAmount);
  }

  return storeInputAmount(state, inputAmount);
}

function calculateAndUpdateOutputAmount(state) {
  const { ratesData, inputCurrency, outputCurrency, inputAmount: rawInputAmount } = state;

  const inputAmount = parseFloat(rawInputAmount);
  if (isNaN(inputAmount) || inputAmount < 0) {
    return storeOutputAmount(state, EMPTY_AMOUNT);
  }

  let outputAmount = utils.calcOutputAmount(ratesData, inputCurrency.id, outputCurrency.id, inputAmount);

  const isFiatCurrency = utils.isFiatCurrency(outputCurrency.id);
  const isCryptoCurrency = utils.isCryptoCurrency(outputCurrency.id);

  if (isFiatCurrency) {
    outputAmount = utils.normalizeFiatCurrencyAmount(outputAmount);
  } else if (isCryptoCurrency) {
    outputAmount = utils.normalizeCryptoCurrencyAmount(outputAmount);
  }

  return storeOutputAmount(state, outputAmount);
}

// ----------------
// bank accounts
// ----------------
function storeBankAccountsData(state, bankAccountsData) {
  return { ...state, bankAccountsData };
}

function validateBankAccount(state) {
  const { bankAccountsData, inputCurrency, outputCurrency } = state;

  let fiatCurrency;
  if (utils.isFiatCurrency(inputCurrency.id)) {
    fiatCurrency = inputCurrency;
  } else if (utils.isFiatCurrency(outputCurrency.id)) {
    fiatCurrency = outputCurrency;
  } else {
    return storeBankAccountValidation(state, true);
  }

  const hasBankAccount = utils.hasBankAccount(bankAccountsData, fiatCurrency.id);
  return storeBankAccountValidation(state, hasBankAccount);
}

function storeBankAccountValidation(state, hasBankAccount) {
  return { ...state, hasBankAccount };
}

// ----------------
// input amount limits
// ----------------
function updateInputAmountLimits(state) {
  const {
    ratesData,
    quotaData,
    inputCurrency,
    outputCurrency,
    inputAmount: rawInputAmount
  } = state;

  const inputAmount = parseFloat(rawInputAmount);
  if (isNaN(inputAmount)) {
    return storeInputAmountLimits(state, EMPTY_AMOUNT_LIMIT, EMPTY_AMOUNT_LIMIT);
  }

  const min = utils.getMinAllowedInputValue(inputCurrency.id);
  const max = utils.getMaxAllowedInputValue(inputCurrency.id, outputCurrency.id, ratesData, quotaData);
  return storeInputAmountLimits(state, min, max);
}

function storeInputAmountLimits(state, inputMinAmount, inputMaxAmount) {
  return { ...state, inputMinAmount, inputMaxAmount };
}

// ----------------
// input amount validation
// ----------------
function validateInputAmount(state) {
  const {
    inputAmount: rawInputAmount,
    inputMinAmount,
    inputMaxAmount
  } = state;

  const inputAmount = parseFloat(rawInputAmount);

  if (isNaN(inputAmount) || isNaN(inputMinAmount) || isNaN(inputMaxAmount)) {
    return storeInputAmountValidation(state, inputAmountValidationErrors.NONE);
  }

  if (inputAmount < inputMinAmount) {
    return storeInputAmountValidation(state, inputAmountValidationErrors.MIN);
  }

  if (inputAmount > inputMaxAmount) {
    return storeInputAmountValidation(state, inputAmountValidationErrors.MAX);
  }

  return storeInputAmountValidation(state, inputAmountValidationErrors.NONE);
}

function storeInputAmountValidation(state, inputAmountError) {
  return { ...state, inputAmountError };
}

// ----------------
// validate all data
// ----------------
function validateForm(state) {
  const {
    inputAmount: rawInputAmount,
    outputAmount: rawOutputAmount
  } = state;

  const inputAmount = parseFloat(rawInputAmount);
  if (isNaN(inputAmount) || inputAmount <= 0) {
    return storeCanConvert(state, false);
  }

  const outputAmount = parseFloat(rawOutputAmount);
  if (isNaN(outputAmount) || outputAmount <= 0) {
    return storeCanConvert(state, false);
  }

  if (state.inputAmountError !== inputAmountValidationErrors.NONE) {
    return storeCanConvert(state, false);
  }

  if (!state.hasBankAccount) {
    return storeCanConvert(state, false);
  }

  // TODO validate wallet

  return storeCanConvert(state, true);
}

function storeCanConvert(state, canConvert) {
  return { ...state, canConvert };
}
