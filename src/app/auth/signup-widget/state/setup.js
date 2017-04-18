import { mountPoint } from './constants';
import reducer from './reducer';
import daemonFactory from './daemon';

export default function setupSignupWidgetState(cfg = {}, bity) {
  const { reducers: prevReducers = {}, sagas: prevSagas = [] } = cfg;

  const reducers = {
    ...prevReducers,
    [mountPoint]: reducer
  };

  const sagas = [
    ...prevSagas,
    daemonFactory(bity)
  ];

  return {
    ...cfg,
    reducers,
    sagas
  };
}
