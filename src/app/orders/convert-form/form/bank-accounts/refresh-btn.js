import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Spinner from '../../../../lib/spinner';

import styles from './styles.less';

const propTypes = {
  isLoading: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};

const defaultProps = {
  isLoading: false,
  className: '',
  disabled: false
};

export default function RefreshBankAccountsBtn(props) {
  const { isLoading } = props;
  const content = createContent(isLoading);

  const { className: extraClassName } = props;
  const btnClassName = classNames('btn btn-primary btn-xs', styles.btn, extraClassName);

  const { disabled, onClick } = props;

  return (
    <button className={btnClassName} onClick={onClick} disabled={disabled}>
      {content}
    </button>
  );
}

RefreshBankAccountsBtn.propTypes = propTypes;
RefreshBankAccountsBtn.defaultProps = defaultProps;

function createContent(isLoading) {
  if (isLoading) {
    return (
      <span className={styles.loading}>
        <Spinner type="inline" />
        <span>Loading...</span>
      </span>
    );
  }
  return (
    <span>Reload bank accounts data</span>
  );
}
