import * as actions from './actions';
import { utils as currencyUtils } from '../../../../common-data/currencies';
import * as exchangePartiesActions from '../exchange-parties/actions';

export default function formReducer(state, action) {
  switch (action.type) {
    case actions.MOUNTED:
      return onMounted(state, action);
    case exchangePartiesActions.OUTPUT_CURRENCY_CODE_CHANGED:
    case exchangePartiesActions.SWAPPED_AROUND:
      return onOutputCurrencyChanged(state, action);
    default:
      return state;
  }
}

function onMounted(state) {
  return {
    ...state,
    form: {
      ...state.form,
      mounted: true
    }
  };
}

// TODO this needs a better place in the state
function onOutputCurrencyChanged(state, action) {
  let nextState = { ...state };

  nextState = updateVisibilityOfBankAccounts(nextState, action);
  nextState = updateVisibilityOfExternalReference(nextState, action);

  return nextState;
}

// TODO this needs a better place in the state
function updateVisibilityOfBankAccounts(state) {
  const {
    exchangeParties: {
      output: {
        selectedCurrencyCode
      }
    }
  } = state;

  const showBankAccounts = currencyUtils.isFiatCurrency(selectedCurrencyCode);

  return {
    ...state,
    form: {
      ...state.form,
      showBankAccounts
    }
  };
}

// TODO this needs a better place in the state
function updateVisibilityOfExternalReference(state) {
  const {
    exchangeParties: {
      output: {
        selectedCurrencyCode
      }
    }
  } = state;

  const showExternalReference = currencyUtils.isFiatCurrency(selectedCurrencyCode);

  return {
    ...state,
    form: {
      ...state.form,
      showExternalReference
    }
  };
}
