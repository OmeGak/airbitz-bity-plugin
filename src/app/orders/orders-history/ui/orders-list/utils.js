// TODO DRY see src/app/orders/order-details-page/page/utils.js
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
