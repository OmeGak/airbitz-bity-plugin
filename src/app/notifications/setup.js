import daemonFactory from './notifications-daemon';

export default function setupNotifications(cfg) {
  const { reducers: prevReducers = {}, sagas: prevSagas = [] } = cfg;

  const reducers = {
    ...prevReducers
  };

  const sagas = [
    ...prevSagas,
    daemonFactory
  ];

  return {
    ...cfg,
    reducers,
    sagas
  };
}
