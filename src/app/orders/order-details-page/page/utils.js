import numeral from 'numeral';
import { utils as currencyUtils } from '../../../common-data/currencies';

const DEFAULT_LOCALE = 'en';

const cryptoCurrencyFormat = '0.0000';
const fiatCurrencyFormat = '0,0.00';

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

// TODO DRY there are a lot of similar code
export function formatAmount(amount, currencyCode) {
  switch (true) {
    case currencyUtils.isFiatCurrency(currencyCode):
      return numeral(amount).format(fiatCurrencyFormat);
    case currencyUtils.isCryptoCurrency(currencyCode):
      return numeral(amount).format(cryptoCurrencyFormat);
    default:
      return amount;
  }
}

// TODO DRY see src/app/orders/orders-history/ui/orders-list/utils.js
export function getOrderStatusTitle(status = {}) {
  switch (true) {
    case status.isCanceled:
      return 'Canceled';
    case status.isOpen:
      return 'Open';
    case status.isPaymentReceived:
      return 'Payment received';
    case status.isConfirmed:
      return 'Confirmed';
    case status.isPaymentFinalized:
      return 'Payment being finalized';
    default:
      return '';
  }
}
