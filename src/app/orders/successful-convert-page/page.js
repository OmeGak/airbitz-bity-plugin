import React, { PropTypes } from 'react';
import Page from '../../lib/page';
import { Card, CardHeader, CardBody } from '../../lib/card';
import Link from '../../lib/link';
import { exchangeDirection as exchangeDirections } from '../../common-data/currencies';

import styles from './styles.less';

const btnClassName = `${styles.btn} btn btn-primary`;

const propTypes = {
  data: PropTypes.object.isRequired, // eslint-disable-line react/no-unused-prop-types
  exchangeDirection: PropTypes.string.isRequired
};

export default function SuccessfulConvertPage(props) {
  const { exchangeDirection } = props;

  let content;
  switch (exchangeDirection) {
    case exchangeDirections.FIAT_TO_CRYPTO:
      content = createFiatToCryptoContent(props);
      break;
    case exchangeDirections.CRYPTO_TO_FIAT:
      content = createCryptoToFiatContent(props);
      break;
    default:
      content = null;
  }

  return (
    <Page>
      <Card>
        <CardHeader>Your order has been placed.</CardHeader>
        <CardBody>
          {content}
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

function createFiatToCryptoContent(props) {
  const {
    data: { // eslint-disable-line react/prop-types
      amount,
      currency: currencyCode,
      reference: referenceId
    }
  } = props;

  return (
    <div className={styles.section}>
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
    </div>
  );
}

function createCryptoToFiatContent() {
  return (
    <div className={styles.section}>
      <div className={styles.section}>
        <span>Your payment has been received. Thank you.</span>
        <br />
        <span>Your order will be processed immediately after 3 confirmations.</span>
      </div>
    </div>
  );
}
