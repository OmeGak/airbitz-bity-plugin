import parse, { parseCryptoToFiatResponse } from './create-order-response-parser';

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

export function exchangeCryptoToFiatFactory(ajax) {
  return (data, requireOutputAmount) => {
    const {
      category,
      inputAmount,
      outputAmount,
      outputCurrencyCode: currency,
      paymentMethodCode: payment_method,
      bankAccountUuid: bank_account_uuid,
      externalReference: external_reference
    } = data;

    const requestData = {
      currency,
      category,
      payment_method,
      bank_account_uuid,
      external_reference
    };

    if (requireOutputAmount !== true) {
      // the amount of BTC which user agree to spend
      requestData.amount = inputAmount;
      // the value of parameter "amount" contains "Expected amount of money for spending"
      requestData.amount_mode = 1;
    } else {
      // the amount in fiat currency which user expects to receive
      requestData.amount = outputAmount;
      // the value of parameter "amount" contains "Expected amount of money to receive"
      requestData.amount_mode = 0;
    }

    const ajaxCfg = {
      method: 'POST',
      url: URL,
      data: requestData
    };

    return ajax(ajaxCfg)
      .then(resp => parseCryptoToFiatResponse(resp.data));
  };
}
