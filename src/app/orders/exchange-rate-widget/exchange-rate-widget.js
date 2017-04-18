import React, { PropTypes } from 'react';
import classNames from 'classnames';

import * as utils from './utils';
import styles from './styles.less';

const propTypes = {
  className: PropTypes.string,
  exchangeRates: PropTypes.arrayOf(PropTypes.shape({
    pair: PropTypes.string.isRequired,
    rateWeBuy: PropTypes.number.isRequired,
    rateWeSell: PropTypes.number.isRequired
  })).isRequired,
  inputCurrency: PropTypes.string.isRequired,
  outputCurrency: PropTypes.string.isRequired
};

const defaultProps = {
  className: ''
};

export default function ExchangeRateWidget(props) {
  const { className: extraClassName } = props;
  const rootClassName = classNames(styles.root, extraClassName);

  const { inputCurrency, outputCurrency, exchangeRates } = props;
  const rateValue = utils.calcRate(inputCurrency, outputCurrency, exchangeRates);
  const rateOutput = utils.formatOutput(rateValue);

  return (
    <div className={rootClassName}>
      <div className={styles.title}>Rate we convert</div>
      <div className={styles.rate}>{rateOutput}</div>
    </div>
  );
}

ExchangeRateWidget.propTypes = propTypes;
ExchangeRateWidget.defaultProps = defaultProps;
