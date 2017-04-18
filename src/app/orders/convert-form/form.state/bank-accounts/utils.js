import { EMPTY_ACCOUNT_ID } from '../constants';

export function findBankAccountsByCurrencyCode(allAccounts, currencyCode) {
  if (isEmptyArray(allAccounts)) {
    return [];
  }
  return allAccounts.filter(obj => obj.currencyCode === currencyCode);
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
