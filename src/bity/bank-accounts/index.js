import { fetchFactory } from './bank-accounts';

export default function bankAccountsApiFactory(ajax) {
  return {
    fetch: fetchFactory(ajax)
  };
}
