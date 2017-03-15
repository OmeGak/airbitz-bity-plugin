import { EMPTY_ACCOUNT_ID } from '../constants';
import { utils as bankAccountUtils } from '../../../../common-data/bank-accounts';

export function findBankAccountsByCurrencyCode(allAccounts, currencyCode) {
  if (isEmptyArray(allAccounts)) {
    return [];
  }
  return bankAccountUtils.findBankAccountsByCurrencyCode(allAccounts, currencyCode);
}

export function calcNextSelectedId(accounts, existingId) {
  if (isEmptyArray(accounts)) {
    return EMPTY_ACCOUNT_ID;
  }

  const isPartOfAccounts = accounts.some(obj => obj.id === existingId);
  if (isPartOfAccounts) {
    return existingId;
  }
  return accounts[0].id;
}

function isEmptyArray(obj) {
  return !Array.isArray(obj) || obj.length === 0;
}
