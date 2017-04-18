import { EMPTY_AMOUNT } from '../constants';
import { utils as exchangeRatesUtils } from '../../../../common-data/exchange-rates';
import { utils as currencyUtils } from '../../../../common-data/currencies';

export function calcOutputAmount(inputAmount, inputCurrencyCode, outputCurrencyCode, rates) {
  const isNumber = Number(inputAmount);
  if (!isNumber) {
    return EMPTY_AMOUNT;
  }

  const numInputAmount = parseFloat(inputAmount);
  if (!isValidAmount(numInputAmount)) {
    return EMPTY_AMOUNT;
  }

  const amount = exchangeRatesUtils.calcOutputAmount(rates, inputCurrencyCode, outputCurrencyCode, numInputAmount);

  if (currencyUtils.isFiatCurrency(outputCurrencyCode)) {
    return formatFiatCurrencyAmount(amount);
  }

  if (currencyUtils.isCryptoCurrency(outputCurrencyCode)) {
    return formatCryptoCurrencyAmount(amount);
  }

  return amount;
}

export function calcInputAmount(outputAmount, inputCurrencyCode, outputCurrencyCode, rates) {
  const isNumber = Number(outputAmount);
  if (!isNumber) {
    return EMPTY_AMOUNT;
  }

  const numOutputAmount = parseFloat(outputAmount);
  if (!isValidAmount(numOutputAmount)) {
    return EMPTY_AMOUNT;
  }

  const amount = exchangeRatesUtils.calcInputAmount(rates, inputCurrencyCode, outputCurrencyCode, numOutputAmount);

  if (currencyUtils.isFiatCurrency(inputCurrencyCode)) {
    return formatFiatCurrencyAmount(amount);
  }

  if (currencyUtils.isCryptoCurrency(inputCurrencyCode)) {
    return formatCryptoCurrencyAmount(amount);
  }

  return amount;
}

function isValidAmount(v) {
  const num = parseFloat(v);
  return !isNaN(num) && num >= 0;
}

function formatFiatCurrencyAmount(v) {
  const num = parseFloat(v);
  if (isNaN(num)) {
    return EMPTY_AMOUNT;
  }
  return Math.floor(num * 100) / 100;
}

function formatCryptoCurrencyAmount(v) {
  const num = parseFloat(v);
  if (isNaN(num)) {
    return EMPTY_AMOUNT;
  }
  return Math.floor(num * 1000000) / 1000000;
}
