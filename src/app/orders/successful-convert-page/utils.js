// TODO DRY see order-details-page/page/utils.js

const DEFAULT_LOCALE = 'en';

export function getPaymentMethodDetails(orderPaymentMethodCode, allPaymentMethods) {
  let list;

  list = allPaymentMethods.filter(({ code }) => code === orderPaymentMethodCode);
  if (list.length === 0) {
    return null;
  }

  const paymentMethod = list[0];

  list = paymentMethod.descriptions.filter(({ locale }) => locale === DEFAULT_LOCALE);
  if (list.length === 0) {
    return null;
  }

  const description = list[0];

  return {
    name: description.name,
    description: description.description,
    provider: paymentMethod.provider
  };
}
