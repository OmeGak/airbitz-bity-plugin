import { prefix } from '../constants';

export const PAYMENT_METHODS_CHANGED = `${prefix}::PAYMENT_METHODS_CHANGED`;
export function paymentMethodsChanged(data) {
  return {
    type: PAYMENT_METHODS_CHANGED,
    payload: data
  };
}

export const AVAILABLE_PAYMENT_METHODS_CHANGED = `${prefix}::AVAILABLE_PAYMENT_METHODS_CHANGED`;
export function availablePaymentMethodsChanged(data) {
  return {
    type: AVAILABLE_PAYMENT_METHODS_CHANGED,
    payload: data
  };
}

export const SELECTED_PAYMENT_METHOD_ID_CHANGED = `${prefix}::SELECTED_PAYMENT_METHOD_ID_CHANGED`;
export function selectedPaymentMethodIdChanged(id) {
  return {
    type: SELECTED_PAYMENT_METHOD_ID_CHANGED,
    payload: id
  };
}

export const PAYMENT_METHODS_UI_VISIBILITY_CHANGED = `${prefix}::PAYMENT_METHODS_UI_VISIBILITY_CHANGED`;
export function paymentMethodsUiVisibilityChanged(isVisible) {
  return {
    type: PAYMENT_METHODS_UI_VISIBILITY_CHANGED,
    payload: isVisible
  };
}
