import { mountPoint } from './constants';
import reducer from './reducer';
import ordersHistoryDaemonFactory from './daemon';

export default function setupOrdersHistory(cfg = {}, bity) {
  const { reducers: prevReducers = {}, sagas: prevSagas = [] } = cfg;

  const reducers = {
    ...prevReducers,
    [mountPoint]: reducer
  };

  const sagas = [
    ...prevSagas,
    ordersHistoryDaemonFactory(bity)
  ];

  return {
    ...cfg,
    reducers,
    sagas
  };
}
