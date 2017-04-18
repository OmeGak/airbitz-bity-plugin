import { parse, isValidNumber } from 'libphonenumber-js';

export function usernameFieldValidatorFactory() {
  return {
    // required: isNotEmptyString
  };
}

export function emailFieldValidatorFactory() {
  return {
    required: isNotEmptyString,
    email: isValidEmail
  };
}

export function passwordFieldValidatorFactory() {
  return {
    required: isNotEmptyString,
    passwordStrength: validatePasswordStrength
  };
}

export function phoneNumberFieldValidatorFactory() {
  return {
    required: isNotEmptyString,
    validPhoneNumber: isValidPhoneNumber
  };
}

export function phoneNumberFieldErrorMessages() {
  return {
    required: 'Please provide a phone number',
    validPhoneNumber: 'Please provide a valid phone number'
  };
}

export function passwordFieldErrorMessages() {
  return {
    required: 'Please provide a password',
    passwordStrength: 'Your password should contain at least 6 characters'
  };
}

export function usernameFieldErrorMessages() {
  return {
    required: 'Please provide username'
  };
}

export function emailFieldErrorMessages() {
  return {
    required: 'Please provide an email',
    email: 'Please provide a valid email'
  };
}

function isNotEmptyString(v) {
  return typeof v === 'string' && v.length > 0;
}

function validatePasswordStrength(v) {
  return isNotEmptyString(v) && v.length >= 6;
}

function isValidPhoneNumber(v) {
  if (typeof v !== 'string') {
    return false;
  }

  const parsedValue = parse(v);
  return isValidNumber(parsedValue);
}

function isValidEmail(v) {
  return /.+@.+\..+/i.test(v);
}
