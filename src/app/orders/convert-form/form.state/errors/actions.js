import { prefix } from '../constants';

export const VALIDATE_ALL = `${prefix}::VALIDATE_ALL`;
export function validateAll() {
  return {
    type: VALIDATE_ALL
  };
}

export const VALIDATE_INPUT = `${prefix}::VALIDATE_INPUT`;
export function validateInput() {
  return {
    type: VALIDATE_INPUT
  };
}

export const VALIDATE_BANK_ACCOUNT = `${prefix}::VALIDATE_BANK_ACCOUNT`;
export function validateBankAccount() {
  return {
    type: VALIDATE_BANK_ACCOUNT
  };
}

export const VALIDATE_EXTERNAL_REFERENCE = `${prefix}::VALIDATE_EXTERNAL_REFERENCE`;
export function validateExternalReference() {
  return {
    type: VALIDATE_EXTERNAL_REFERENCE
  };
}

export const VALIDATE_FORM = `${prefix}::VALIDATE_FORM`;
export function validateForm() {
  return {
    type: VALIDATE_FORM
  };
}
