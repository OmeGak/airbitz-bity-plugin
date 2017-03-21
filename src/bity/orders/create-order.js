import parse from './create-order-response-parser';

const URL = '/order/';

export function createOrderFactory(ajax) {
  return () => {
    const ajaxCfg = {
      method: 'POST',
      url: URL,
      data: {}
    };

    return ajax(ajaxCfg)
      .then(resp => parse(resp.data));
  };
}

export function exchangeFiatToCryptoFactory(ajax) {
  return (data) => {
    const {
      category,
      inputAmount: amount,
      inputCurrencyCode: currency,
      paymentMethodCode: payment_method,
      cryptoAddress: crypto_address
    } = data;

    const ajaxCfg = {
      method: 'POST',
      url: URL,
      data: {
        category,
        amount,
        currency,
        payment_method,
        crypto_address
      }
    };

    return ajax(ajaxCfg)
      .then(resp => parse(resp.data));
  };
}
