import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { reducer, sagas } from './reducers';

export default function (initialState) {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(reducer, initialState, applyMiddleware(sagaMiddleware));

  sagas.forEach((saga) => {
    sagaMiddleware.run(saga);
  });

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const newReducer = require('./reducers').reducer; // eslint-disable-line global-require
      store.replaceReducer(newReducer);
    });
  }

  return store;
}
