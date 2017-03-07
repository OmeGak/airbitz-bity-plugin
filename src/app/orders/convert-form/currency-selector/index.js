import React, { PropTypes } from 'react';
import styles from './styles.less';

const chevronClassName = `${styles.chevronDown} chevron-down`;

const currencyPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
});

const propTypes = {
  currencies: PropTypes.arrayOf(currencyPropType).isRequired,
  onChange: PropTypes.func.isRequired,
  value: currencyPropType.isRequired
};

const defaultProps = {};

export default function CurrencySelector({ currencies, onChange, value }) {
  if (currencies.length > 1) {
    return (
      <div className={styles.root}>
        <select className="form-control" onChange={handleOnChange} value={value.id}>
          {currencies.map(obj => (
            <option key={obj.id} value={obj.id}>{obj.title}</option>
          ))}
        </select>
        <div className={chevronClassName} />
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <span className={`form-control ${styles.singleOption}`}>{currencies[0].title}</span>
    </div>
  );

  function handleOnChange(e) {
    onChange(e.target.value);
  }
}

CurrencySelector.propTypes = propTypes;
CurrencySelector.defaultProps = defaultProps;
