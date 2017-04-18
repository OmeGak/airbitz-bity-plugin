import { prefix as rootPrefix } from '../constants';

const prefix = `${rootPrefix}::exchange-parties`;

export const INPUT_AMOUNT_CHANGED = `${prefix}::INPUT_AMOUNT_CHANGED`;
export function inputAmountChanged(amount, isInternal = false) {
  return {
    type: INPUT_AMOUNT_CHANGED,
    payload: amount,
    meta: {
      isInternal
    }
  };
}

export const OUTPUT_AMOUNT_CHANGED = `${prefix}::OUTPUT_AMOUNT_CHANGED`;
export function outputAmountChanged(amount, isInternal = false) {
  return {
    type: OUTPUT_AMOUNT_CHANGED,
    payload: amount,
    meta: {
      isInternal
    }
  };
}

export const INPUT_CURRENCY_CODE_CHANGED = `${prefix}::INPUT_CURRENCY_CODE_CHANGED`;
export function inputCurrencyCodeChanged(currencyCode) {
  return {
    type: INPUT_CURRENCY_CODE_CHANGED,
    payload: currencyCode
  };
}

export const OUTPUT_CURRENCY_CODE_CHANGED = `${prefix}::OUTPUT_CURRENCY_CODE_CHANGED`;
export function outputCurrencyCodeChanged(currencyCode) {
  return {
    type: OUTPUT_CURRENCY_CODE_CHANGED,
    payload: currencyCode
  };
}

export const SWAPPED_AROUND = `${prefix}::SWAPPED_AROUND`;
export function swap() {
  return {
    type: SWAPPED_AROUND
  };
}

export const RATES_CHANGED = `${prefix}::RATES_CHANGED`;
export function ratesChanged(rates) {
  return {
    type: RATES_CHANGED,
    payload: rates
  };
}

