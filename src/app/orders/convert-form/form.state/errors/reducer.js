import { EMPTY_AMOUNT } from '../constants';
import * as actions from './actions';
import * as utils from './utils';

export default function errorsReducer(state, action) {
  switch (action.type) {
    case actions.VALIDATE_ALL:
      return validateAll(state, action);
    case actions.VALIDATE_INPUT:
      return validateInputAmount(state, action);
    case actions.VALIDATE_BANK_ACCOUNT:
      return validateBankAccount(state, action);
    case actions.VALIDATE_EXTERNAL_REFERENCE:
      return validateExternalReference(state, action);
    case actions.VALIDATE_FORM:
      return validateForm(state, action);
    default:
      return state;
  }
}

function validateAll(state) {
  let nextState = { ...state };

  nextState = errorsReducer(nextState, actions.validateInput());
  nextState = errorsReducer(nextState, actions.validateBankAccount());
  nextState = errorsReducer(nextState, actions.validateForm());

  return nextState;
}

function validateInputAmount(state) {
  const {
    exchangeParties: {
      input: {
        amount,
        selectedCurrencyCode
      }
    },
    rates,
    quota
  } = state;

  const isNotPositiveNumber = !utils.isPositiveNumber(amount);
  if (isNotPositiveNumber) {
    return {
      ...state,
      errors: {
        ...state.errors,
        input: {
          positiveNumber: true,
          min: false,
          max: false,
          minAllowedValue: EMPTY_AMOUNT,
          maxAllowedValue: EMPTY_AMOUNT
        }
      }
    };
  }

  const isLessThanMinAllowedAmount = utils.isLessThanMinAllowedAmount(amount, selectedCurrencyCode);
  const minAllowedValue = utils.calcMinAllowedValue(selectedCurrencyCode);
  if (isLessThanMinAllowedAmount) {
    return {
      ...state,
      errors: {
        ...state.errors,
        input: {
          positiveNumber: false,
          min: true,
          max: false,
          minAllowedValue,
          maxAllowedValue: EMPTY_AMOUNT
        }
      }
    };
  }

  const isMoreThanMaxAllowedAmount =
    utils.isMoreThanMaxAllowedAmount(amount, selectedCurrencyCode, quota, rates);
  const maxAllowedValue = utils.calcMaxAllowedAmount(selectedCurrencyCode, quota, rates);
  if (isMoreThanMaxAllowedAmount) {
    return {
      ...state,
      errors: {
        ...state.errors,
        input: {
          positiveNumber: false,
          min: false,
          max: true,
          minAllowedValue: EMPTY_AMOUNT,
          maxAllowedValue
        }
      }
    };
  }

  return {
    ...state,
    errors: {
      ...state.errors,
      input: {
        positiveNumber: false,
        min: false,
        max: false,
        minAllowedValue: EMPTY_AMOUNT,
        maxAllowedValue: EMPTY_AMOUNT
      }
    }
  };
}

function validateBankAccount(state) {
  const {
    exchangeParties: {
      output: {
        selectedCurrencyCode: outputCurrencyCode
      }
    },
    bankAccounts: {
      all: allBankAccounts
    }
  } = state;

  const bankAccountIsRequired = utils.bankAccountIsRequired(outputCurrencyCode);
  if (!bankAccountIsRequired) {
    return {
      ...state,
      errors: {
        ...state.errors,
        bankAccounts: {
          required: false
        }
      }
    };
  }

  const hasBankAccount = utils.hasBankAccount(outputCurrencyCode, allBankAccounts);
  if (!hasBankAccount) {
    return {
      ...state,
      errors: {
        ...state.errors,
        bankAccounts: {
          required: true
        }
      }
    };
  }

  return {
    ...state,
    errors: {
      ...state.errors,
      bankAccounts: {
        required: false
      }
    }
  };
}

function validateExternalReference(state) {
  const { externalReference } = state;
  const isValid = typeof externalReference === 'string' && externalReference.length <= 129;

  return {
    ...state,
    errors: {
      ...state.errors,
      externalReference: {
        max: !isValid
      }
    }
  };
}

function validateForm(state) {
  const {
    errors: {
      input,
      bankAccounts,
      externalReference
    }
  } = state;

  const inputAmountIsValid = input.positiveNumber === false && input.min === false && input.max === false;
  const bankAccountIsValid = bankAccounts.required === false;
  const externalReferenceIsValid = externalReference.max === false;
  const formIsValid = inputAmountIsValid && bankAccountIsValid && externalReferenceIsValid;

  return {
    ...state,
    errors: {
      ...state.errors,
      form: {
        invalid: !formIsValid
      }
    }
  };
}
