import React, { PropTypes } from 'react';
import Selector from '../selector';
import Link from '../../../../lib/link';
import RefreshBtn from './refresh-btn';

import styles from './styles.less';

const propTypes = {
  accounts: PropTypes.array.isRequired,
  selectedAccountId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  isLoading: PropTypes.bool.isRequired,
  currencyCode: PropTypes.string.isRequired,
  onAccountChange: PropTypes.func.isRequired,
  onRefreshBtnClick: PropTypes.func.isRequired
};
const defaultProps = {};

export default function BankAccounts(props) {
  const { accounts, currencyCode } = props;

  // ------------------------
  // label
  // ------------------------
  let title;
  let labelClassName = styles.label;
  switch (true) {
    case accounts.length === 0:
      title = `You need to register your "${currencyCode}" bank account`;
      labelClassName = `${labelClassName} ${styles.labelNoAccount}`;
      break;
    case accounts.length === 1:
      title = 'This bank account will be used:';
      break;
    default:
      title = 'Select the destination account:';
  }

  const labelNode = (
    <div className={labelClassName}>{title}</div>
  );

  // ------------------------
  // selector
  // ------------------------
  const { selectedAccountId, onAccountChange } = props;

  let selectorNode = null;

  const selectorItems = accounts.map(obj => ({
    id: obj.id,
    label: obj.label
  }));

  if (accounts.length > 0) {
    selectorNode = (
      <Selector items={selectorItems} value={selectedAccountId} onChange={onAccountChange} />
    );
  }

  // ------------------------
  // create account btn
  // ------------------------
  let createBtnTitle;
  switch (true) {
    case accounts.length > 0:
      createBtnTitle = 'Register another bank account';
      break;
    default:
      createBtnTitle = 'Register bank account';
  }

  const linkPath = {
    pathname: 'bank-accounts/create',
    state: {
      currencyCode
    }
  };

  const createBtn = (
    <Link className="btn btn-link btn-xs" to={linkPath}>
      <span>{createBtnTitle}</span>
    </Link>
  );

  // ------------------------
  // refresh btn
  // ------------------------
  const { onRefreshBtnClick, isLoading } = props;
  const refreshBtn = (
    <RefreshBtn className={styles.refreshBtn}
      onClick={onRefreshBtnClick} isLoading={isLoading} disabled={isLoading} />
  );

  return (
    <div className={styles.root}>
      {labelNode}
      {selectorNode}
      <div className={styles.createBtnContainer}>
        {createBtn}
      </div>
      <div className={styles.refreshBtnContainer}>
        {refreshBtn}
      </div>
    </div>
  );
}

BankAccounts.propTypes = propTypes;
BankAccounts.defaultProps = defaultProps;
