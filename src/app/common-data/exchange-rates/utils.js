export function calcOutputAmount(rates, inputCurrencyId, outputCurrencyId, inputAmount) {
  const rate = getExchangeRate(rates, inputCurrencyId, outputCurrencyId);
  return inputAmount * rate;
}

export function calcInputAmount(rates, inputCurrencyId, outputCurrencyId, outputAmount) {
  const rate = getExchangeRate(rates, inputCurrencyId, outputCurrencyId);
  return outputAmount / rate;
}

export function createPairKey(currencyA, currencyB) {
  return `${currencyA}${currencyB}`;
}

function getExchangeRate(rates, inputCurrencyId, outputCurrencyId) {
  let pairValue;
  let record;

  if (inputCurrencyId === 'EUR' && outputCurrencyId === 'BTC') {
    pairValue = createPairKey(inputCurrencyId, outputCurrencyId);
    record = rates.filter(({ pair }) => pair === pairValue)[0];
    return parseFloat(record.rateWeSell);
  }

  if (inputCurrencyId === 'BTC' && outputCurrencyId === 'EUR') {
    pairValue = createPairKey(inputCurrencyId, outputCurrencyId);
    record = rates.filter(({ pair }) => pair === pairValue)[0];
    return parseFloat(record.rateWeBuy);
  }

  if (inputCurrencyId === 'CHF' && outputCurrencyId === 'BTC') {
    pairValue = createPairKey(inputCurrencyId, outputCurrencyId);
    record = rates.filter(({ pair }) => pair === pairValue)[0];
    return parseFloat(record.rateWeSell);
  }

  if (inputCurrencyId === 'BTC' && outputCurrencyId === 'CHF') {
    pairValue = createPairKey(inputCurrencyId, outputCurrencyId);
    record = rates.filter(({ pair }) => pair === pairValue)[0];
    return parseFloat(record.rateWeBuy);
  }

  throw createUnknownPairOfCurrenciesError(inputCurrencyId, outputCurrencyId);
}

function createUnknownPairOfCurrenciesError(inputCurrencyId, outputCurrencyId) {
  return new Error(`Unknown pair of currencies "${inputCurrencyId}", "${outputCurrencyId}"`);
}

export function legacyConvert2(ratesData, pairValue, inputAmount) {
  const record = ratesData.filter(({ pair }) => pair === pairValue)[0];
  if (typeof record === 'undefined') {
    throw new Error(`Unknown pair of currencies "${pairValue}"`);
  }
  const rate = Math.min(record.rateWeBuy, record.rateWeSell);
  return inputAmount * rate;
}
