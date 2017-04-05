import React, { PropTypes, Component } from 'react';
import { Card, CardHeader, CardBody } from '../../../lib/card';
import ExchangeRateWidget from './exchange-rate-widget';

import ExchangeParties from './exchange-parties';
import BankAccounts from './bank-accounts';
import PaymentMethods from './payment-methods';
import ExternalReference from './external-reference';
import SubmitBtn from './submit-btn';
import EstimatedPriceNotification from './estimated-price-notification';

import styles from './form.less';

const propTypes = {
  isExchangeFromCryptoToFiat: PropTypes.bool.isRequired,
  hasBankAccounts: PropTypes.bool.isRequired,
  showBankAccounts: PropTypes.bool.isRequired,
  showPaymentMethods: PropTypes.bool.isRequired,
  showExternalReference: PropTypes.bool.isRequired,
  onMounted: PropTypes.func.isRequired,
  onUnmounted: PropTypes.func.isRequired
};

export default class ConvertForm extends Component {
  static propTypes = propTypes;

  componentDidMount() {
    this.props.onMounted();
  }

  componentWillUnmount() {
    this.props.onUnmounted();
  }

  render() {
    const { hasBankAccounts, isExchangeFromCryptoToFiat } = this.props;

    const { showBankAccounts } = this.props;
    let bankAccountsSection = null;
    if (showBankAccounts) {
      bankAccountsSection = (
        <div className={styles.formSection}>
          <BankAccounts />
        </div>
      );
    }

    const { showPaymentMethods } = this.props;
    let paymentMethodsSection = null;
    if (showPaymentMethods) {
      paymentMethodsSection = (
        <div className={styles.formSection}>
          <PaymentMethods />
        </div>
      );
    }

    const { showExternalReference } = this.props;
    let externalReferenceSection = null;
    if (showExternalReference && hasBankAccounts) {
      externalReferenceSection = (
        <div className={styles.formSection}>
          <ExternalReference />
        </div>
      );
    }

    let submitBtnNode = (
      <div className={styles.formSection}>
        <SubmitBtn />
      </div>
    );
    if (isExchangeFromCryptoToFiat && !hasBankAccounts) {
      submitBtnNode = null;
    }

    return (
      <Card>
        <CardHeader className={styles.cardHeader}>
          <div className={styles.headerTitle}>Buy / Sell</div>
          <ExchangeRateWidget className={styles.exchangeRateWidget} />
        </CardHeader>
        <CardBody>
          <div className={styles.formSection}>
            <ExchangeParties />
            <EstimatedPriceNotification className={styles.estimatedPriceNotification} />
          </div>
          {bankAccountsSection}
          {paymentMethodsSection}
          {externalReferenceSection}
          {submitBtnNode}
        </CardBody>
      </Card>
    );
  }
}
