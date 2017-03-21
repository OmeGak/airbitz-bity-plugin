import React, { PropTypes } from 'react';
import Page from '../../lib/page';
import { Card, CardHeader, CardBody } from '../../lib/card';
import Link from '../../lib/link';

import styles from './styles.less';

const btnClassName = `${styles.btn} btn btn-primary`;

const propTypes = {
  data: PropTypes.object.isRequired
};

export default function SuccessfulConvertPage(props) {
  const { data: { amount, currency: currencyCode, reference: referenceId } } = props;

  /* eslint-disable no-trailing-spaces */

  return (
    <Page>
      <Card>
        <CardHeader>Your order has been placed.</CardHeader>
        <CardBody>
          <div className={styles.section}>
            <span>Please follow the instructions below for the payment.</span>
          </div>
          <div className={styles.section}>
            <div className={styles.orderInfo}>
              <div className={styles.reference}>
                <span>reference:&nbsp;</span>
                <span>{referenceId}</span>
              </div>
              <div className={styles.amount}>
                <span>amount:&nbsp;</span>
                <span className={styles.amountValue}>{amount} {currencyCode}</span></div>
            </div>
          </div>
          <div className={styles.section}>
            <span>Your order will be processed as soon as your payment is received. 
            The price will be fixed at the same moment. If the reference is missing,
            a research fee will be applied.</span>
          </div>
          <div className={styles.section}>
            <div className={styles.buttons}>
              <Link to="/orders" className={btnClassName}>Go to history</Link>
              <Link to="/convert" className={btnClassName}>Create another order</Link>
            </div>
          </div>
        </CardBody>
      </Card>
    </Page>
  );
}

SuccessfulConvertPage.propTypes = propTypes;
