import { reducer as notificationSystemReducer } from 'react-notification-system-redux';
import runNotificationsDaemon from './notifications-daemon';

export default function setupNotifications(cfg) {
  const { reducers: prevReducers = {}, sagas: prevSagas = [] } = cfg;

  const reducers = {
    ...prevReducers,
    notifications: notificationSystemReducer
  };

  const sagas = [
    ...prevSagas,
    runNotificationsDaemon
  ];

  return {
    ...cfg,
    reducers,
    sagas
  };
}
