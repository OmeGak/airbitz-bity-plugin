import { MOUNT_POINT } from './constants';
import reducer from './reducer';
import runAuthDaemon from './auth-daemon';

export default function setupAuth(cfg, bity) {
  const { reducers: prevReducers = {}, sagas: prevSagas = [] } = cfg;

  const reducers = {
    ...prevReducers,
    [MOUNT_POINT]: reducer
  };

  const sagas = [
    ...prevSagas,
    runAuthDaemon(bity)
  ];

  return {
    ...cfg,
    reducers,
    sagas
  };
}
