import numeral from 'numeral';

export function calcRate(inputCurrency, outputCurrency, exchangeRates) {
  const key = `${inputCurrency}${outputCurrency}`;
  const record = exchangeRates.filter(({ pair }) => pair === key)[0];
  if (typeof record === 'undefined') {
    throw new Error(`Unknown pair of currencies "${inputCurrency}" and "${outputCurrency}"`);
  }

  return 1 / Math.min(record.rateWeBuy, record.rateWeSell);
}

const formatPattern = '0,000.0000';
export function formatOutput(v) {
  return numeral(v).format(formatPattern);
}
