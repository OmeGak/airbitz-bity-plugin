import * as paymentMethodsDetails from './payment-method-details';

export function getPaymentMethodDetails(paymentMethodCode) {
  const list = Object.keys(paymentMethodsDetails)
    .map(key => paymentMethodsDetails[key])
    .filter(obj => obj.code === paymentMethodCode);

  let title = paymentMethodCode;
  let description = '';

  if (list.length > 0) {
    title = list[0].title || title;
    description = list[0].description || description;
  }

  return { title, description };
}
