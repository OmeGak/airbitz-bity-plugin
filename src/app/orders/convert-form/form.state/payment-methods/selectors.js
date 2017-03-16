import { mountPoint } from '../constants';

export function getAvailablePaymentMethods(state) {
  return state[mountPoint].paymentMethods.available;
}

export function getSelectedPaymentMethodId(state) {
  return state[mountPoint].paymentMethods.selectedId;
}

export function uiIsVisible(state) {
  return state[mountPoint].paymentMethods.showUi === true;
}
