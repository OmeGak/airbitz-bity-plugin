import React, { PropTypes } from 'react';

const propTypes = {
  className: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  onChange: PropTypes.func.isRequired
};

const defaultProps = {
  className: '',
  value: NaN
};

export default function AmountInput({ className, value, onChange }) {
  return (
    <input className={className}
      type="number"
      value={value} onChange={handleOnChange}
      placeholder="Amount" />
  );

  function handleOnChange(event) {
    onChange(event.target.value);
  }
}

AmountInput.propTypes = propTypes;
AmountInput.defaultProps = defaultProps;
