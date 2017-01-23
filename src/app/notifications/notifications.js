import React, { PropTypes } from 'react';
import Notifications from 'react-notification-system-redux';
import { connect } from 'react-redux';
import styles from './styles';

export default connect(mapStateToProps)(AppNotifications);

function mapStateToProps(state) {
  return {
    notifications: state.notifications
  };
}

const propTypes = {
  notifications: PropTypes.array
};

const defaultProps = {
  notifications: []
};

function AppNotifications({ notifications }) {
  return (
    <Notifications notifications={notifications} style={styles} />
  );
}

AppNotifications.propTypes = propTypes;
AppNotifications.defaultProps = defaultProps;
