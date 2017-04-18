import React, { PropTypes } from 'react';
import Page from '../../lib/page';
import LoggedInUserView from '../lib/logged-in-user-view';
import LoggedOutUserView from './logged-out-user-view';

const propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

export default function LoginPage({ isAuthenticated }) {
  const content = isAuthenticated ? (<LoggedInUserView />) : (<LoggedOutUserView />);

  return (
    <Page>
      {content}
    </Page>
  );
}

LoginPage.propTypes = propTypes;
