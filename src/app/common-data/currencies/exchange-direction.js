import { isFiatCurrency, isCryptoCurrency } from './utils';

export const FIAT_TO_CRYPTO = 'FIAT_TO_CRYPTO';
export const CRYPTO_TO_FIAT = 'CRYPTO_TO_FIAT';

export function calcExchangeDirection(inputCurrencyCode, outputCurrencyCode) {
  if (isFiatCurrency(inputCurrencyCode) && isCryptoCurrency(outputCurrencyCode)) {
    return FIAT_TO_CRYPTO;
  }

  if (isCryptoCurrency(inputCurrencyCode) && isFiatCurrency(outputCurrencyCode)) {
    return CRYPTO_TO_FIAT;
  }

  throw new Error(`Unsupported pair of currencies "${inputCurrencyCode}", "${outputCurrencyCode}"`);
}
