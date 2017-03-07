export const prefix = 'convertWidget';
export const mountPoint = prefix;

export const currencies = {
  BTC: {
    id: 'BTC',
    title: 'Bitcoin',
    shortTitle: 'BTC'
  },
  EUR: {
    id: 'EUR',
    title: 'Euro (EUR)',
    shortTitle: 'EUR'
  },
  CHF: {
    id: 'CHF',
    title: 'Swiss Francs (CHF)',
    shortTitle: 'CHF'
  }
};

export const minAllowedAmounts = {
  [currencies.EUR.id]: 10,
  [currencies.CHF.id]: 10,
  [currencies.BTC.id]: 0.01
};

export const inputAmountValidationErrors = {
  NONE: 'NONE',
  MIN: 'MIN',
  MAX: 'MAX'
};
