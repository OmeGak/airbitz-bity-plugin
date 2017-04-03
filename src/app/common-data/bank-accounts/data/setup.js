import { mountPoint } from './constants';
import reducer from './reducer';
// import daemonFactory from './daemon';

export default function setupBankAccountsDataStore(cfg = {}) {
  const { reducers: prevReducers = {}, sagas: prevSagas = [] } = cfg;

  const reducers = {
    ...prevReducers,
    [mountPoint]: reducer
  };

  const sagas = [
    ...prevSagas// ,
    // daemonFactory(bity)
  ];

  return {
    ...cfg,
    reducers,
    sagas
  };
}
