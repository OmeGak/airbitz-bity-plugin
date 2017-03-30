import * as actions from './actions';
import * as exchangePartiesActions from '../exchange-parties/actions';
import * as utils from './utils';

export default function paymentMethodsReducer(state, action) {
  switch (action.type) {
    case exchangePartiesActions.OUTPUT_CURRENCY_CODE_CHANGED:
    case exchangePartiesActions.SWAPPED_AROUND:
      return onOutputCurrencyChanged(state, action);
    case actions.PAYMENT_METHODS_CHANGED:
      return onPaymentMethodsChanged(state, action);
    case actions.AVAILABLE_PAYMENT_METHODS_CHANGED:
      return onAvailablePaymentMethodsChanged(state, action);
    case actions.SELECTED_PAYMENT_METHOD_ID_CHANGED:
      return onSelectedPaymentMethodChanged(state, action);
    case actions.PAYMENT_METHODS_UI_VISIBILITY_CHANGED:
      return onVisibilityOfPaymentMethodsUiChanged(state, action);
    default:
      return state;
  }
}

// --------------------------
// all payment methods
// --------------------------
function onPaymentMethodsChanged(state, { payload: all }) {
  let nextState = {
    ...state,
    paymentMethods: {
      ...state.paymentMethods,
      all
    }
  };

  nextState = calcAndUpdateAvailablePaymentMethods(nextState);

  return nextState;
}

// --------------------------
// available payment methods
// --------------------------
function onAvailablePaymentMethodsChanged(state, { payload: available }) {
  let nextState = {
    ...state,
    paymentMethods: {
      ...state.paymentMethods,
      available
    }
  };

  nextState = calcAndUpdateSelectedPaymentMethod(nextState);

  return nextState;
}

function calcAndUpdateAvailablePaymentMethods(state) {
  const {
    paymentMethods: {
      all: allPaymentMethods
    },
    exchangeParties: {
      input: {
        selectedCurrencyCode
      }
    },
    quota
  } = state;

  const availablePaymentMethods =
    utils.findEnabledPaymentMethodsByCurrencyCode(allPaymentMethods, quota, selectedCurrencyCode);
  return paymentMethodsReducer(state, actions.availablePaymentMethodsChanged(availablePaymentMethods));
}

// --------------------------
// selected payment method
// --------------------------
function onSelectedPaymentMethodChanged(state, { payload: selectedId }) {
  return {
    ...state,
    paymentMethods: {
      ...state.paymentMethods,
      selectedId
    }
  };
}

function calcAndUpdateSelectedPaymentMethod(state) {
  const {
    paymentMethods: {
      available: availablePaymentMethods,
      selectedId
    }
  } = state;

  const id = utils.calcSelectedPaymentMethod(availablePaymentMethods, selectedId);
  return paymentMethodsReducer(state, actions.selectedPaymentMethodIdChanged(id));
}

// --------------------------
// visibility of payment methods ui
// --------------------------
function onVisibilityOfPaymentMethodsUiChanged(state, { payload: isVisible }) {
  return {
    ...state,
    paymentMethods: {
      ...state.paymentMethods,
      showUi: isVisible
    }
  };
}

function calcAndUpdateVisibilityOfPaymentMethodsUi(state) {
  const {
    paymentMethods: {
      available: availablePaymentMethods
    },
    exchangeParties: {
      input: {
        selectedCurrencyCode: inputCurrencyCode
      }
    }
  } = state;

  const isVisible = utils.calcVisibilityOfPaymentMethodsUi(inputCurrencyCode, availablePaymentMethods);
  return paymentMethodsReducer(state, actions.paymentMethodsUiVisibilityChanged(isVisible));
}

// --------------------------
// on output currency changed
// --------------------------
function onOutputCurrencyChanged(state, action) {
  let nextState = { ...state };

  nextState = calcAndUpdateAvailablePaymentMethods(nextState, action);
  nextState = calcAndUpdateVisibilityOfPaymentMethodsUi(nextState, action);
  return nextState;
}
