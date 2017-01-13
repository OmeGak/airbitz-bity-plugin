import React, { PropTypes } from 'react';

import Router from 'react-router/lib/Router';
import hashHistory from 'react-router/lib/hashHistory';
// import { Router, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import routes from './routes';

const propTypes = {
  store: PropTypes.object.isRequired
};

export default function App({ store }) {
  return (
    <Provider store={store}>
      <Router key={Math.random()} history={hashHistory} routes={routes} />
    </Provider>
  );
}

App.propTypes = propTypes;
