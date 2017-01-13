import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader'; // eslint-disable-line import/no-extraneous-dependencies
import App from './app';
import createStore from './app/create-store';

const store = createStore();

const container = document.querySelector('#app');

renderApp(App);

if (module.hot) {
  module.hot.accept('./app', () => {
    const NewApp = require('./app').default; // eslint-disable-line no-unused-expressions, global-require
    renderApp(NewApp);
  });
}

function renderApp(Component) {
  render((
    <AppContainer>
      <Component store={store} />
    </AppContainer>
  ), container);
}
