import fiatCurrencies from './fiat-currencies';
import cryptoCurrencies from './crypto-currencies';

export function isFiatCurrency(currencyCode) {
  return fiatCurrencies.some(({ code }) => code === currencyCode);
}

export function isCryptoCurrency(currencyCode) {
  return cryptoCurrencies.some(({ code }) => code === currencyCode);
}
