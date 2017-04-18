import reducer from './reducer';
import { mountPoint } from './constants';

export default function setupSidebarMenu(cfg = {}) {
  const { reducers: prevReducers = {} } = cfg;

  const reducers = {
    ...prevReducers,
    [mountPoint]: reducer
  };

  return {
    ...cfg,
    reducers
  };
}
