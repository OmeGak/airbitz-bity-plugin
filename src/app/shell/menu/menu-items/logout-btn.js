import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Button from './btn';
import { actions as authStoreActions } from '../../../common-data/auth';

export default connect(null, mapDispatchToProps)(LogoutButton);

function mapDispatchToProps(dispatch) {
  return {
    onClick() {
      dispatch(authStoreActions.logout());
    }
  };
}

const propTypes = {
  onClick: PropTypes.func.isRequired
};

function LogoutButton({ onClick, ...rest }) {
  return (
    <Button title="Logout" onClick={onClick} {...rest} />
  );
}

LogoutButton.propTypes = propTypes;
