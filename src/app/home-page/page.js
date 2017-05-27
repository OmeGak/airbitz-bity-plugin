import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import Page from '../lib/page';
import { Card, CardBody } from '../lib/card';
import { exchangeDirection } from '../common-data/currencies';

import styles from './styles.less';

const mainBtnClassName = `btn btn-info ${styles.btn}`;
const footerBtnClassName = `btn btn-link ${styles.btn}`;

const buyBitcoinsLink = {
  pathname: '/convert',
  state: {
    exchangeDirection: exchangeDirection.FIAT_TO_CRYPTO
  }
};

const sellBitcoinsLink = {
  pathname: '/convert',
  state: {
    exchangeDirection: exchangeDirection.CRYPTO_TO_FIAT
  }
};

const propTypes = {
  onLogoutBtn: PropTypes.func.isRequired
};

export default function HomePage({ onLogoutBtn }) {
  return (
    <Page className={styles.page}>
      <Card className={styles.card}>
        <CardBody className={styles.cardBody}>
          <div className={styles.mainButtons}>
            <div className={styles.btnSection}>
              <Link to={buyBitcoinsLink} className={mainBtnClassName}>Buy Bitcoins</Link>
            </div>
            <div className={styles.btnSection}>
              <Link to={sellBitcoinsLink} className={mainBtnClassName}>Sell Bitcoins</Link>
            </div>
            <div className={styles.btnSection}>
              <Link to="/orders" className={mainBtnClassName}>History</Link>
            </div>
          </div>

          <div className={styles.footerButtons}>
            <div className={styles.btnSection}>
              <Link to="/account" className={footerBtnClassName}>My Info</Link>
            </div>
            <div className={styles.btnSection}>
              <Link to="/about-us" className={footerBtnClassName}>About Us</Link>
            </div>
            <div className={styles.btnSection}>
              <button onClick={onLogoutBtn} className={footerBtnClassName}>Logout</button>
            </div>
          </div>
        </CardBody>
      </Card>
    </Page>
  );
}

HomePage.propTypes = propTypes;
