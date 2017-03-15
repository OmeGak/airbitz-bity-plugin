import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import { currencies } from '../../../../common-data/currencies';
import Selector from '../selector';
import AmountInput from './amount-input';
import styles from './styles.less';

const inputClassName = `form-control ${styles.input}`;

const mediaQuery = '(max-width: 400px)';

const propTypes = {
  className: PropTypes.string,
  amount: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]).isRequired,
  selectedCurrencyCode: PropTypes.string.isRequired,
  currencyList: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAmountChange: PropTypes.func.isRequired,
  onCurrencyChange: PropTypes.func.isRequired,
  inputErrors: PropTypes.object
};

const defaultProps = {
  className: '',
  inputErrors: {}
};

export default class ExchangePartyWidget extends Component {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  constructor(props) {
    super(props);

    this.mql = null;
    this.mediaQueryListener = this.mediaQueryListener.bind(this);

    this.state = {
      useShortLabel: false
    };
  }

  componentDidMount() {
    this.setupMediaQueryListener();
  }

  componentWillUnmount() {
    this.disposeMediaQueryListener();
  }

  setupMediaQueryListener() {
    if (typeof window.matchMedia !== 'function') {
      return;
    }
    const mql = window.matchMedia(mediaQuery);

    const canUseListener =
      typeof mql.addListener === 'function' && typeof mql.removeListener === 'function';
    if (!canUseListener) {
      return;
    }

    this.mql = mql;
    this.mql.addListener(this.mediaQueryListener);
    this.updateOnMediaQuery();
  }

  disposeMediaQueryListener() {
    if (this.mql === null) {
      return;
    }
    this.mql.removeListener(this.mediaQueryListener);
    this.mql = null;
  }

  mediaQueryListener() {
    this.updateOnMediaQuery();
  }

  updateOnMediaQuery() {
    this.setState({
      useShortLabel: this.mql.matches
    });
  }

  render() {
    // class name
    const { className: extraClassName } = this.props;
    const className = classNames(styles.root, extraClassName);

    // amount
    const { onAmountChange, amount } = this.props;

    // currencies
    const { selectedCurrencyCode, currencyList, onCurrencyChange } = this.props;
    const selectorItems = makeSelectorItems(currencyList, this.state.useShortLabel);

    // error msg
    const { inputErrors } = this.props;
    const errorMsg = makeErrorMsg(inputErrors, selectedCurrencyCode);

    return (
      <div className={className}>
        <div className={styles.inputContainer}>
          <AmountInput className={inputClassName} value={amount} onChange={onAmountChange} />
          {errorMsg}
        </div>
        <div className={styles.selectorContainer}>
          <Selector value={selectedCurrencyCode} items={selectorItems} onChange={onCurrencyChange} />
        </div>
      </div>
    );
  }
}

function makeSelectorItems(currencyList, useShortLabel = false) {
  return currencyList.map((code) => {
    const { title } = findCurrencyByCode(code);
    const label = useShortLabel ? title : `${title} (${code})`;
    return { id: code, label };
  });
}

function findCurrencyByCode(code) {
  const list = Object.keys(currencies)
    .map(key => currencies[key])
    .filter(obj => obj.code === code);

  if (list.length === 0) {
    throw new Error(`Unsupported currency code "${code}"`);
  }
  return list[0];
}

function makeErrorMsg(errors, currencyCode) {
  const hasError = errors.min === true || errors.max === true;
  if (!hasError) {
    return null;
  }

  let title;
  let amount;
  switch (true) {
    case errors.min:
      amount = formatErrorMsgAmount(errors.minAllowedValue);
      title = `The minimum amount is ${amount} ${currencyCode}`;
      break;
    case errors.max:
      amount = formatErrorMsgAmount(errors.maxAllowedValue);
      title = `The maximum amount is ${amount} ${currencyCode}`;
      break;
    default:
      throw new Error(`Unsupported case for "${JSON.stringify(errors)}"`);
  }

  return (
    <span className={styles.errorMsg}>{title}</span>
  );
}

function formatErrorMsgAmount(v) {
  return Math.floor(v * 1000000) / 1000000;
}
