import { createStore } from 'redux';
import reducers from './reducers';

export default function (initialState) {
  const store = createStore(reducers, initialState);

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const newReducer = require('./reducers').default; // eslint-disable-line global-require
      store.replaceReducer(newReducer);
    });
  }

  return store;
}
