export function hasBankAccount(bankAccountsData, currencyId) {
  if (!Array.isArray(bankAccountsData) || bankAccountsData.length === 0) {
    return false;
  }

  return findBankAccountsByCurrencyId(bankAccountsData, currencyId).length > 0;
}

function findBankAccountsByCurrencyId(bankAccountsData, currencyId) {
  return bankAccountsData
    .filter((obj) => {
      const bankAccountCurrencyId = extractBankAccountCurrencyId(obj);
      return bankAccountCurrencyId === currencyId;
    });
}

function extractBankAccountCurrencyId({ currency = '' }) {
  // data about the currency of bank account is stored in the field "currency" so:
  // { ...
  //   currency: "/api/v1/currency/EUR/"
  //   ...
  // }
  const regExp = /([^/]+)\/$/g;
  const res = regExp.exec(currency);
  if (!Array.isArray(res) || res.length < 2) {
    throw new Error(`Invalid value of currency "${currency}"`);
  }
  return res[1];
}
