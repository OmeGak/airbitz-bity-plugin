import * as actions from './actions';
import * as exchangePartiesActions from '../exchange-parties/actions';
import * as utils from './utils';

export default function bankAccountsReducer(state, action) {
  switch (action.type) {
    case actions.ALL_ACCOUNTS_CHANGED:
      return onAllAccountsChanged(state, action);
    case actions.AVAILABLE_ACCOUNTS_CHANGED:
      return onAvailableAccountsChanged(state, action);
    case exchangePartiesActions.OUTPUT_CURRENCY_CODE_CHANGED:
    case exchangePartiesActions.SWAPPED_AROUND:
    case exchangePartiesActions.EXCHANGE_DIRECTION_CHANGED:
      return calcAndUpdateAvailableAccounts(state, action);
    case actions.SELECTED_ACCOUNT_ID_CHANGED:
      return onSelectedAccountIdChanged(state, action);
    default:
      return state;
  }
}

// --------------------------
// all accounts
// --------------------------
function onAllAccountsChanged(state, { payload: allAccounts }) {
  let nextState = {
    ...state,
    bankAccounts: {
      ...state.bankAccounts,
      all: allAccounts
    }
  };

  nextState = calcAndUpdateAvailableAccounts(nextState);

  return nextState;
}

// --------------------------
// accounts available for selected output currency
// --------------------------
function onAvailableAccountsChanged(state, { payload: available }) {
  const nextState = {
    ...state,
    bankAccounts: {
      ...state.bankAccounts,
      available
    }
  };

  return calcAndUpdateSelectedAccountId(nextState);
}

function calcAndUpdateAvailableAccounts(state) {
  const {
    bankAccounts: {
      all: allAccounts
    },
    exchangeParties: {
      output: {
        selectedCurrencyCode
      }
    }
  } = state;

  const accounts = utils.findBankAccountsByCurrencyCode(allAccounts, selectedCurrencyCode);
  return bankAccountsReducer(state, actions.availableAccountsChanged(accounts));
}

// --------------------------
// selected bank account
// --------------------------
function onSelectedAccountIdChanged(state, { payload: selectedId }) {
  return {
    ...state,
    bankAccounts: {
      ...state.bankAccounts,
      selectedId
    }
  };
}

function calcAndUpdateSelectedAccountId(state) {
  const {
    bankAccounts: {
      available: accounts,
      selectedId
    }
  } = state;

  const id = utils.calcNextSelectedId(accounts, selectedId);
  return bankAccountsReducer(state, actions.selectedAccountIdChanged(id));
}
