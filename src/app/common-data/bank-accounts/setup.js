import { setup as setupBankAccountsDataStore } from './data';
import { setup as setupLoadBankAccounts } from './load';
import { setup as setupAddBankAccountOp } from './add';

export default function setupBankAccounts(cfg, bity) {
  let nextCfg = { ...cfg };

  nextCfg = setupBankAccountsDataStore(nextCfg, bity);
  nextCfg = setupLoadBankAccounts(nextCfg, bity);
  nextCfg = setupAddBankAccountOp(nextCfg, bity);

  return nextCfg;
}
