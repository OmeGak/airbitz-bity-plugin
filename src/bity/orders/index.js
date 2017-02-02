import fetchListOfOrdersFactory from './fetch-list-of-orders';

export default function ordersApiFactory(ajax) {
  return {
    fetchListOfOrders: fetchListOfOrdersFactory(ajax),
    fetchOrderDetails() {},
    createOrder() {}
  };
}
