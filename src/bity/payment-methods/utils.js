import * as quotaUtils from '../quota/utils';

export function findEnabledPaymentMethodsByCurrencyCode(paymentMethods, quotaData, inputCurrencyCode) {
  const quotaGroup = quotaUtils.getQuotaGroup(quotaData);
  return paymentMethods
    .filter(obj => filterByCurrency(obj, inputCurrencyCode))
    .filter(obj => isPaymentMethodEnabled(obj, quotaGroup))
    .filter(obj => !isDeprecatedPaymentMethod(obj));
}

function filterByCurrency({ currencies }, currencyCode) {
  return currencies.indexOf(currencyCode) > -1;
}

function isPaymentMethodEnabled(paymentMethod, quotaGroup) {
  const { code, provider } = paymentMethod;
  if ((code === 'SKRILLPSP' || code === 'SOFORTPSP') && quotaGroup === 'fstquota0') {
    return false;
  }

  return provider.enabled === true;
}

const deprecatedPaymentMethodCodes = [
  'STRAIGHT'
];
function isDeprecatedPaymentMethod({ code }) {
  return deprecatedPaymentMethodCodes.indexOf(code) !== -1;
}

// ==========================
// parse raw response data
// ==========================
export function extractCurrencyCodeFromUrl(url) {
  const res = /([^/]+)\/?$/.exec(url);
  if (!Array.isArray(res) || res.length < 2) {
    throw new Error('Can\'t extract currency code');
  }
  return res[1];
}

export function extractCountryCodeFromUrl(url) {
  const res = /([^/]+)\/?$/gi.exec(url);
  if (!Array.isArray(res) || res.length < 2) {
    throw new Error('Can\'t extract country code');
  }
  return res[1];
}

export function extractProviderData(rawPaymentMethodData) {
  const {
    payment_provider: {
      accounts = [],
      close_time: closeTime,
      is_24hrs: is24Hrs,
      is_open: isOpen,
      open_time: openTime,
      open_weekend: openWeekend,
      provider_enabled: enabled,
      provider_name: name
    }
  } = rawPaymentMethodData;

  return {
    accounts,
    closeTime,
    is24Hrs,
    isOpen,
    openTime,
    openWeekend,
    enabled,
    name
  };
}

export function extractDescriptions({ text = [] }) {
  return text.map((obj) => {
    const {
      payment_method_description: description,
      payment_method_disabled_message: disabledMessage,
      payment_method_image_path: imagePath,
      payment_method_locale: locale,
      payment_method_name: name
    } = obj;

    return {
      description,
      disabledMessage,
      imagePath,
      locale,
      name
    };
  });
}
