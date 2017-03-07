import React, { PropTypes, Component } from 'react';

import { Card, CardHeader, CardBody } from '../../../lib/card';
import ExchangeRateWidget from '../../exchange-rate-widget';
import AmountInput from '../amount-input';
import CurrencySelector from '../currency-selector';
import SwapBtn from '../swap-btn';
import InputAmountError from '../input-amount-error';
import ConvertBtn from '../convert-btn';
import BankAccountWidget from '../bank-account-widget';
import styles from './styles.less';

const amountInputClassName = `form-control ${styles.amountInput}`;

const inputFormSectionClassName = styles.section;
const swapBtnFormSectionClassName = `${styles.section} ${styles.swapBtnSection}`;
const outputFormSectionClassName = styles.section;

const currencyPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
});

const propTypes = {
  inputCurrency: currencyPropType.isRequired,
  inputAmount: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  inputCurrencyList: PropTypes.arrayOf(currencyPropType).isRequired,
  outputCurrency: currencyPropType.isRequired,
  outputAmount: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  outputCurrencyList: PropTypes.arrayOf(currencyPropType).isRequired,
  onMounted: PropTypes.func.isRequired,
  onUnmounted: PropTypes.func.isRequired,
  onInputAmountChange: PropTypes.func.isRequired,
  onOutputAmountChange: PropTypes.func.isRequired,
  onInputCurrencyChange: PropTypes.func.isRequired,
  onOutputCurrencyChange: PropTypes.func.isRequired,
  swapParties: PropTypes.func.isRequired
};

export default class ConvertForm extends Component {
  static propTypes = propTypes;

  constructor(props) {
    super(props);

    this.onInputAmountChange = this.onInputAmountChange.bind(this);
    this.onOutputAmountChange = this.onOutputAmountChange.bind(this);
    this.onInputCurrencyChange = this.onInputCurrencyChange.bind(this);
    this.onOutputCurrencyChange = this.onOutputCurrencyChange.bind(this);
    this.handleClickOnSwapBtn = this.handleClickOnSwapBtn.bind(this);
  }

  componentDidMount() {
    this.props.onMounted();
  }

  componentWillUnmount() {
    this.props.onUnmounted();
  }

  onInputAmountChange(v) {
    this.props.onInputAmountChange(v);
  }

  onOutputAmountChange(v) {
    this.props.onOutputAmountChange(v);
  }

  onInputCurrencyChange(currencyId) {
    this.props.onInputCurrencyChange(currencyId);
  }

  onOutputCurrencyChange(currencyId) {
    this.props.onOutputCurrencyChange(currencyId);
  }

  handleClickOnSwapBtn() {
    this.props.swapParties();
  }

  render() {
    const {
      inputCurrency,
      outputCurrency,
      inputAmount,
      outputAmount,
      inputCurrencyList,
      outputCurrencyList
    } = this.props;

    return (
      <Card>
        <CardHeader className={styles.cardHeader}>
          <div className={styles.headerTitle}>Buy / Sell</div>
          <ExchangeRateWidget className={styles.exchangeRateWidget}
            inputCurrency={inputCurrency.id} outputCurrency={outputCurrency.id} />
        </CardHeader>
        <CardBody>
          <form noValidate className={styles.form}>
            <div className={styles.formInner}>
              <div className={inputFormSectionClassName}>
                <div className={styles.group}>
                  <AmountInput className={amountInputClassName}
                    value={inputAmount} onChange={this.onInputAmountChange} />
                  <div className={styles.currencySelectorContainer}>
                    <CurrencySelector currencies={inputCurrencyList}
                      value={inputCurrency} onChange={this.onInputCurrencyChange} />
                  </div>

                  <InputAmountError className={styles.inputError} />
                </div>
              </div>
              <div className={swapBtnFormSectionClassName}>
                <div className={styles.group}>
                  <SwapBtn onClick={this.handleClickOnSwapBtn} />
                </div>
              </div>
              <div className={outputFormSectionClassName}>
                <div className={styles.group}>
                  <AmountInput className={amountInputClassName}
                    value={outputAmount} onChange={this.onOutputAmountChange} />
                  <div className={styles.currencySelectorContainer}>
                    <CurrencySelector currencies={outputCurrencyList}
                      value={outputCurrency} onChange={this.onOutputCurrencyChange} />
                  </div>
                </div>
              </div>
            </div>
          </form>

          <BankAccountWidget />
          <ConvertBtn />
        </CardBody>
      </Card>
    );
  }
}
