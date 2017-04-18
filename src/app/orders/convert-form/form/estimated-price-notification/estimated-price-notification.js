import React, { PropTypes } from 'react';
import { utils } from '../../../../common-data/currencies';

const propTypes = {
  className: PropTypes.string,
  inputCurrencyCode: PropTypes.string
};

const defaultProps = {
  className: '',
  inputCurrencyCode: ''
};

export default function EstimatedPriceNotification(props) {
  if (!utils.isFiatCurrency(props.inputCurrencyCode)) {
    return null;
  }

  return (
    <div className={props.className}>
      <div>Only an estimated price is shown. The price will be calculate when we receive your payment.</div>
    </div>
  );
}

EstimatedPriceNotification.propTypes = propTypes;
EstimatedPriceNotification.defaultProps = defaultProps;
