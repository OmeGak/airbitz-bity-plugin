import React, { PropTypes } from 'react';

const propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  onChange: PropTypes.func.isRequired
};

const defaultProps = {
  value: ''
};

export default function AmountInput(props) {
  const { value, onChange, ...otherProps } = props;
  return (
    <input placeholder="Amount" type="text" value={value} onChange={handleOnChange} {...otherProps} />
  );

  function handleOnChange(event) {
    onChange(event.target.value);
  }
}

AmountInput.propTypes = propTypes;
AmountInput.defaultProps = defaultProps;
