import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Button from './btn';
import * as authActions from '../../../auth/data/actions';

export default connect(null, mapDispatchToProps)(LogoutButton);

function mapDispatchToProps(dispatch) {
  return {
    onClick() {
      dispatch(authActions.logout());
    }
  };
}

const propTypes = {
  onClick: PropTypes.func.isRequired
};

function LogoutButton({ onClick }) {
  return (
    <Button title="Logout" onClick={onClick} />
  );
}

LogoutButton.propTypes = propTypes;
