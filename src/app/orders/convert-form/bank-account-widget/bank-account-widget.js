import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Spinner from '../../../lib/spinner';
import { utils } from '../state';
import styles from './styles.less';

const propTypes = {
  hasBankAccount: PropTypes.bool.isRequired,
  bankAccountIsRequired: PropTypes.bool.isRequired,
  className: PropTypes.string,
  inputCurrency: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired,
  outputCurrency: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired,
  onBtnClick: PropTypes.func.isRequired,
  isLoadingStarted: PropTypes.bool.isRequired
};

const defaultProps = {
  className: ''
};

export default function BankAccountWidget(props) {
  const { hasBankAccount, bankAccountIsRequired } = props;
  if (!bankAccountIsRequired || (bankAccountIsRequired && hasBankAccount)) {
    return null;
  }

  const { inputCurrency, outputCurrency } = props;
  let currency;
  if (utils.isFiatCurrency(inputCurrency.id)) {
    currency = inputCurrency;
  } else if (utils.isFiatCurrency(outputCurrency.id)) {
    currency = outputCurrency;
  } else {
    throw new Error('unreachable');
  }

  const { className: extraClassName } = props;
  const className = classNames(styles.root, extraClassName);

  const { onBtnClick, isLoadingStarted } = props;
  const btnClassName = classNames('btn btn-primary btn-block', styles.btn);

  const currencyTitle = currency.title;
  const disabled = isLoadingStarted;

  const btnContent = createBtnContent(isLoadingStarted, currencyTitle);

  return (
    <div className={className}>
      <div className={styles.title}>You need to register your &quot;{currencyTitle}&quot; bank account
      on <a href="https://dev.sbex.ch/" target="_blank" rel="noreferrer noopener">bity.com</a></div>
      <button className={btnClassName} onClick={onBtnClick} disabled={disabled}>
        {btnContent}
      </button>
    </div>
  );
}

BankAccountWidget.propTypes = propTypes;
BankAccountWidget.defaultProps = defaultProps;

function createBtnContent(isLoadingStarted, currencyTitle) {
  if (isLoadingStarted) {
    return (
      <span className={styles.loading}>
        <Spinner type="inline" />
        <span>Checking...</span>
      </span>
    );
  }
  return (
    <span>I have already registered a &quot;{currencyTitle}&quot; bank account</span>
  );
}
