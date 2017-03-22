import fetchListOfOrdersFactory from './fetch-list-of-orders';
import * as createOrder from './create-order';
import cancelOrderFactory from './cancel-order';

export default function ordersApiFactory(ajax) {
  return {
    fetchListOfOrders: fetchListOfOrdersFactory(ajax),
    fetchOrderDetails() {},
    exchangeFiatToCrypto: createOrder.exchangeFiatToCryptoFactory(ajax),
    exchangeCryptoToFiat: createOrder.exchangeCryptoToFiatFactory(ajax),
    cancelOrder: cancelOrderFactory(ajax)
  };
}
