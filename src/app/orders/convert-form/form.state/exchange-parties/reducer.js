import { exchangeDirection as exchangeDirections } from '../../../../common-data/currencies';

import * as actions from './actions';
import * as utils from './utils';

export default function exchangePartiesReducer(state, action) {
  switch (action.type) {
    case actions.INPUT_AMOUNT_CHANGED:
      return onInputAmountChanged(state, action);
    case actions.OUTPUT_AMOUNT_CHANGED:
      return onOutputAmountChanged(state, action);
    case actions.INPUT_CURRENCY_CODE_CHANGED:
      return onInputCurrencyCodeChanged(state, action);
    case actions.OUTPUT_CURRENCY_CODE_CHANGED:
      return onOutputCurrencyCodeChanged(state, action);
    case actions.RATES_CHANGED:
      return onRatesChanged(state, action);
    case actions.SWAPPED_AROUND:
      return onSwap(state, action);
    case actions.EXCHANGE_DIRECTION_CHANGED:
      return onExchangeDirectionChanged(state, action);
    default:
      return state;
  }
}

function onInputAmountChanged(state, action) {
  const { payload: amount } = action;
  let nextState = {
    ...state,
    exchangeParties: {
      ...state.exchangeParties,
      input: {
        ...state.exchangeParties.input,
        amount
      }
    }
  };

  const { meta: { isInternal } } = action;
  if (isInternal) {
    return nextState;
  }

  nextState = {
    ...nextState,
    exchangeParties: {
      ...nextState.exchangeParties,
      input: {
        ...nextState.exchangeParties.input,
        isSourceOfChanges: true
      },
      output: {
        ...nextState.exchangeParties.output,
        isSourceOfChanges: false
      }
    }
  };

  return recalculateAndUpdateOutputAmount(nextState);
}

function onOutputAmountChanged(state, action) {
  const { payload: amount } = action;
  let nextState = {
    ...state,
    exchangeParties: {
      ...state.exchangeParties,
      output: {
        ...state.exchangeParties.output,
        amount
      }
    }
  };

  const { meta: { isInternal } } = action;
  if (isInternal) {
    return nextState;
  }

  nextState = {
    ...nextState,
    exchangeParties: {
      ...nextState.exchangeParties,
      input: {
        ...nextState.exchangeParties.input,
        isSourceOfChanges: false
      },
      output: {
        ...nextState.exchangeParties.output,
        isSourceOfChanges: true
      }
    }
  };

  return updateInputAmountWhenOutputChanged(nextState);
}

function recalculateAndUpdateOutputAmount(state) {
  const inputAmount = state.exchangeParties.input.amount;
  const inputCurrencyCode = state.exchangeParties.input.selectedCurrencyCode;
  const outputCurrencyCode = state.exchangeParties.output.selectedCurrencyCode;
  const rates = state.rates;

  const outputAmount = utils.calcOutputAmount(inputAmount, inputCurrencyCode, outputCurrencyCode, rates);
  return exchangePartiesReducer(state, actions.outputAmountChanged(outputAmount, true));
}

function updateInputAmountWhenOutputChanged(state) {
  const outputAmount = state.exchangeParties.output.amount;
  const inputCurrencyCode = state.exchangeParties.input.selectedCurrencyCode;
  const outputCurrencyCode = state.exchangeParties.output.selectedCurrencyCode;
  const rates = state.rates;

  const inputAmount = utils.calcInputAmount(outputAmount, inputCurrencyCode, outputCurrencyCode, rates);
  return exchangePartiesReducer(state, actions.inputAmountChanged(inputAmount, true));
}

function onInputCurrencyCodeChanged(state, { payload: selectedCurrencyCode }) {
  const nextState = {
    ...state,
    exchangeParties: {
      ...state.exchangeParties,
      input: {
        ...state.exchangeParties.input,
        selectedCurrencyCode
      }
    }
  };

  return recalculateAndUpdateOutputAmount(nextState);
}

function onOutputCurrencyCodeChanged(state, { payload: selectedCurrencyCode }) {
  const nextState = {
    ...state,
    exchangeParties: {
      ...state.exchangeParties,
      output: {
        ...state.exchangeParties.output,
        selectedCurrencyCode
      }
    }
  };

  return recalculateAndUpdateOutputAmount(nextState);
}

function onRatesChanged(state) {
  return recalculateAndUpdateOutputAmount(state);
}

function onSwap(state) {
  const currentExchangeDirection = getCurrentExchangeDirection(state);

  let nextExchangeDirection;
  switch (currentExchangeDirection) {
    case exchangeDirections.CRYPTO_TO_FIAT:
      nextExchangeDirection = exchangeDirections.FIAT_TO_CRYPTO;
      break;
    case exchangeDirections.FIAT_TO_CRYPTO:
      nextExchangeDirection = exchangeDirections.CRYPTO_TO_FIAT;
      break;
  }

  return exchangePartiesReducer(state, actions.exchangeDirectionChanged(nextExchangeDirection));
}

const validExchangeDirections = [
  exchangeDirections.CRYPTO_TO_FIAT,
  exchangeDirections.FIAT_TO_CRYPTO
];
function onExchangeDirectionChanged(state, { payload: { exchangeDirection } }) {
  let nextExchangeDirection = exchangeDirections.FIAT_TO_CRYPTO;
  if (validExchangeDirections.indexOf(exchangeDirection) !== -1) {
    nextExchangeDirection = exchangeDirection;
  }

  const currentExchangeDirection = getCurrentExchangeDirection(state);
  if (nextExchangeDirection === currentExchangeDirection) {
    return state;
  }

  const fiatPart = getFiatPart(state);
  const cryptoPart = getCryptoPart(state);

  let input;
  let output;
  switch (nextExchangeDirection) {
    case exchangeDirections.FIAT_TO_CRYPTO:
      input = fiatPart;
      output = cryptoPart;
      break;
    case exchangeDirections.CRYPTO_TO_FIAT:
      input = cryptoPart;
      output = fiatPart;
      break;
  }

  const nextState = {
    ...state,
    exchangeParties: {
      ...state.exchangeParties,
      input,
      output
    }
  };
  return recalculateAndUpdateOutputAmount(nextState);
}

function getCurrentExchangeDirection(state) {
  const { exchangeParties: { input, output } } = state;
  switch (true) {
    case input.isFiatCurrency === true && output.isFiatCurrency === false:
      return exchangeDirections.FIAT_TO_CRYPTO;
    case input.isFiatCurrency === false && output.isFiatCurrency === true:
      return exchangeDirections.CRYPTO_TO_FIAT;
    default:
      throw new Error('Invalid state');
  }
}

function getFiatPart(state) {
  const { exchangeParties: { input, output } } = state;
  if (input.isFiatCurrency === true) {
    return input;
  }
  if (output.isFiatCurrency === true) {
    return output;
  }
  throw new Error('Invalid state');
}

function getCryptoPart(state) {
  const { exchangeParties: { input, output } } = state;
  if (input.isFiatCurrency === false) {
    return input;
  }
  if (output.isFiatCurrency === false) {
    return output;
  }
  throw new Error('Invalid state');
}
