import { currencies, minAllowedAmounts } from './constants';
import { utils as quotaUtils } from '../../../common-data/quota';
import { utils as exchangeRatesUtils } from '../../../common-data/exchange-rates';
import { utils as bankAccountUtils } from '../../../common-data/bank-accounts';

export function calcOutputAmount(rates, inputCurrencyId, outputCurrencyId, inputAmount) {
  return exchangeRatesUtils.calcOutputAmount(rates, inputCurrencyId, outputCurrencyId, inputAmount);
}

export function calcInputAmount(rates, inputCurrencyId, outputCurrencyId, outputAmount) {
  return exchangeRatesUtils.calcInputAmount(rates, inputCurrencyId, outputCurrencyId, outputAmount);
}

const fiatCurrencyIds = [
  currencies.EUR.id,
  currencies.CHF.id
];
const cryptoCurrencyIds = [
  currencies.BTC.id
];

export function isFiatCurrency(currencyId) {
  return fiatCurrencyIds.indexOf(currencyId) !== -1;
}

export function isCryptoCurrency(currencyId) {
  return cryptoCurrencyIds.indexOf(currencyId) !== -1;
}

export function normalizeFiatCurrencyAmount(v) {
  const numberValue = parseFloat(v);
  if (isNaN(numberValue)) {
    return '';
  }
  return Math.floor(numberValue * 100) / 100;
}

export function normalizeCryptoCurrencyAmount(v) {
  const numberValue = parseFloat(v);
  if (isNaN(numberValue)) {
    return '';
  }
  return Math.floor(numberValue * 1000000) / 1000000;
}

export function getMinAllowedInputValue(currencyId) {
  const value = minAllowedAmounts[currencyId];
  if (typeof value === 'undefined') {
    throw new Error(`Unknown currency "${currencyId}"`);
  }
  return value;
}

export function getMaxAllowedInputValue(inputCurrencyId, outputCurrencyId, ratesData, quotaData) {
  switch (inputCurrencyId) {
    case currencies.EUR.id:
    case currencies.CHF.id:
      return getMaxAllowedInputAmountForFiatCurrency(quotaData);
    case currencies.BTC.id:
      return getMaxAllowedInputAmountForCryptoCurrency(inputCurrencyId, ratesData, quotaData);
    default:
      throw new Error(`Unknown currency "${inputCurrencyId}"`);
  }
}

function getMaxAllowedInputAmountForFiatCurrency(quotaData) {
  return quotaUtils.calcMaxAllowedDailyQuota(quotaData);
}

// here we use legacy way to calculate max allowed value
function getMaxAllowedInputAmountForCryptoCurrency(inputCurrencyId, ratesData, quotaData) {
  if (inputCurrencyId !== currencies.BTC.id) {
    throw new Error(`Unknown input currency "${inputCurrencyId}"`);
  }

  if (quotaUtils.hasUnlimitedQuota(quotaData)) {
    return quotaData.UNLIMITED_QUOTA;
  }

  const yearlyQuota = quotaUtils.calcRemainingYearlyQuota(quotaData);
  return exchangeRatesUtils.legacyConvert2(ratesData, 'EURBTC', yearlyQuota);
}

export function hasBankAccount(bankAccountsData, currencyId) {
  return bankAccountUtils.hasBankAccount(bankAccountsData, currencyId);
}
