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

const inputType = isMobileBrowser() ? 'number' : 'text';

export default function AmountInput(props) {
  const { value, onChange, ...otherProps } = props;
  return (
    <input placeholder="Amount" type={inputType} value={value} onChange={handleOnChange} {...otherProps} />
  );

  function handleOnChange(event) {
    onChange(event.target.value);
  }
}

AmountInput.propTypes = propTypes;
AmountInput.defaultProps = defaultProps;

function isMobileBrowser() {
  const ua = window.navigator.userAgent;
  return /android|ipod|iphone|ipad/gi.test(ua);
}
