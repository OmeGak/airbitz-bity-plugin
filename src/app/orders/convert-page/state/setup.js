import { mountPoint } from './constants';
import reducer from './reducer';
import daemonFactory from './daemon';

export default function setupConvertPageState(cfg = {}) {
  const { reducers: prevReducers = {}, sagas: prevSagas = [] } = cfg;

  const reducers = {
    ...prevReducers,
    [mountPoint]: reducer
  };

  const sagas = [
    ...prevSagas,
    daemonFactory()
  ];

  return {
    ...cfg,
    reducers,
    sagas
  };
}
