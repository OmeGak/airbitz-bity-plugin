import { currencies } from '../../../../common-data/currencies';
import { utils as quotaUtils } from '../../../../common-data/quota';
import { utils as exchangeRatesUtils } from '../../../../common-data/exchange-rates';

// --------------------------
// isPositiveNumber
// --------------------------
export function isPositiveNumber(v) {
  if (isNaN(Number(v))) {
    return false;
  }

  const num = parseFloat(v);
  return !isNaN(num) && num > 0;
}

// --------------------------
// isLessThanMinAllowedAmount
// --------------------------
export const minAllowedAmounts = {
  [currencies.EUR.code]: 10,
  [currencies.CHF.code]: 10,
  [currencies.BTC.code]: 0.01
};

export function isLessThanMinAllowedAmount(amount, currencyCode) {
  const num = parseFloat(amount);
  const min = calcMinAllowedValue(currencyCode);
  return num < min;
}

export function calcMinAllowedValue(currencyCode) {
  return minAllowedAmounts[currencyCode];
}

// --------------------------
// isMoreThanMaxAllowedAmount
// --------------------------
export function isMoreThanMaxAllowedAmount(amount, currencyCode, quotaData, ratesData) {
  const num = parseFloat(amount);
  const max = calcMaxAllowedAmount(currencyCode, quotaData, ratesData);
  return num > max;
}

export function calcMaxAllowedAmount(currencyCode, quotaData, ratesData) {
  switch (currencyCode) {
    case currencies.EUR.code:
    case currencies.CHF.code:
      return getMaxAllowedInputAmountForFiatCurrency(quotaData);
    case currencies.BTC.code:
      return getMaxAllowedInputAmountForCryptoCurrency(ratesData, quotaData);
    default:
      throw new Error(`Unsupported currency "${currencyCode}"`);
  }
}

function getMaxAllowedInputAmountForFiatCurrency(quotaData) {
  return quotaUtils.calcMaxAllowedDailyQuota(quotaData);
}

// here we use legacy way to calculate max allowed value
function getMaxAllowedInputAmountForCryptoCurrency(ratesData, quotaData) {
  if (quotaUtils.hasUnlimitedQuota(quotaData)) {
    return quotaData.UNLIMITED_QUOTA;
  }

  const yearlyQuota = quotaUtils.calcRemainingYearlyQuota(quotaData);
  return exchangeRatesUtils.legacyConvert2(ratesData, 'EURBTC', yearlyQuota);
}

// --------------------------
// bank account
// --------------------------
export function bankAccountIsRequired(outputCurrencyCode) {
  switch (outputCurrencyCode) {
    case currencies.EUR.code:
    case currencies.CHF.code:
      return true;
    default:
      return false;
  }
}

export function hasBankAccount(currencyCode, bankAccountsData) {
  if (!Array.isArray(bankAccountsData)) {
    return false;
  }
  return bankAccountsData.some(obj => obj.currencyCode === currencyCode);
}
