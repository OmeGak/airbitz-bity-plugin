import React, { PropTypes } from 'react';
import Selector from '../selector';
import * as utils from './utils';

import styles from './styles.less';

const propTypes = {
  paymentMethods: PropTypes.array.isRequired,
  selectedId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  onChange: PropTypes.func.isRequired
};

const defaultProps = {};

export default function PaymentMethods(props) {
  const { paymentMethods } = props;

  // ------------------------
  // label
  // ------------------------
  let title;
  switch (true) {
    case paymentMethods.length === 1:
      title = 'This payment method will be used:';
      break;
    default:
      title = 'Select the payment method:';
  }

  const labelNode = (
    <div className={styles.label}>{title}</div>
  );

  // ------------------------
  // selector
  // ------------------------
  const { selectedId, onChange } = props;

  let selectorNode = null;

  const selectorItems = paymentMethods.map(obj => ({
    id: obj.code,
    label: utils.getPaymentMethodDetails(obj.code).title
  }));

  if (paymentMethods.length > 0) {
    selectorNode = (
      <Selector items={selectorItems} value={selectedId} onChange={onChange} />
    );
  }

  return (
    <div className={styles.root}>
      {labelNode}
      {selectorNode}
    </div>
  );
}

PaymentMethods.propTypes = propTypes;
PaymentMethods.defaultProps = defaultProps;
