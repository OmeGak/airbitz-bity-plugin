import React, { PropTypes } from 'react';

import styles from './raw-phone-input.less';

const propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};

const defaultProps = {
  value: ''
};

export default function RawPhoneInput(props) {
  const { onChange, value, ...otherProps } = props;
  return (
    <input className={`form-control ${styles.input}`}
      type="tel"
      placeholder="+44 78 333 22 22"
      value={value}
      onChange={handleChange}
      {...otherProps}
    />
  );

  function handleChange(event) {
    onChange(event.target.value);
  }
}

RawPhoneInput.propTypes = propTypes;
RawPhoneInput.defaultProps = defaultProps;
