import React from 'react';
import Phone from 'react-phone-number-input';

import './phone-input.css';

export default function PhoneInput(props) {
  return (
    <Phone {...props} placeholder="Enter phone number" />
  );
}
