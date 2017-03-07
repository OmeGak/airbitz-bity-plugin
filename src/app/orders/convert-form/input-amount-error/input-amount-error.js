import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { inputAmountValidationErrors } from '../state/constants';
import { utils } from '../state';
import styles from './styles.less';

const propTypes = {
  className: PropTypes.string,
  minAmount: PropTypes.number.isRequired,
  maxAmount: PropTypes.number.isRequired,
  currency: PropTypes.shape({
    id: PropTypes.string.isRequired,
    shortTitle: PropTypes.string.isRequired
  }).isRequired,
  error: PropTypes.string.isRequired
};

const defaultProps = {
  className: ''
};

export default function InputAmountError(props) {
  const { error } = props;
  if (error === inputAmountValidationErrors.NONE) {
    return null;
  }

  const { className: extraClassName } = props;
  const className = classNames(styles.root, extraClassName);

  const { minAmount, maxAmount, currency } = props;

  const currencyTitle = currency.shortTitle;

  const isFiatCurrency = utils.isFiatCurrency(currency.id);
  const isCryptoCurrency = utils.isCryptoCurrency(currency.id);
  let amount;
  switch (error) {
    case inputAmountValidationErrors.MIN:
      amount = minAmount;
      break;
    case inputAmountValidationErrors.MAX:
      amount = maxAmount;
      break;
  }
  if (isFiatCurrency) {
    amount = utils.normalizeFiatCurrencyAmount(amount);
  } else if (isCryptoCurrency) {
    amount = utils.normalizeCryptoCurrencyAmount(amount);
  }

  let title = '';
  switch (error) {
    case inputAmountValidationErrors.MIN:
      title = `The minimum amount is ${amount} ${currencyTitle}`;
      break;
    case inputAmountValidationErrors.MAX:
      title = `The maximum amount is ${amount} ${currencyTitle}`;
      break;
  }

  return (
    <div className={className}>{title}</div>
  );
}

InputAmountError.propTypes = propTypes;
InputAmountError.defaultProps = defaultProps;
