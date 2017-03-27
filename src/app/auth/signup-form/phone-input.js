import React, { PropTypes } from 'react';
import Phone from 'react-phone-number-input';

import './phone-input.css';

const propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

const defaultProps = {
  value: ''
};

export default function PhoneInput({ value, onChange }) {
  return (
    <Phone value={value} onChange={onChange} placeholder="Enter phone number" />
  );
}

PhoneInput.propTypes = propTypes;
PhoneInput.defaultProps = defaultProps;
