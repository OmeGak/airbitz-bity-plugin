import React, { PropTypes } from 'react';
// import Nav from './nav';
import Header from './app-header';
import Notifications from '../notifications/notifications';
import styles from './styles.less';

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {
  children: null
};

export default function Shell({ children }) {
  return (
    <div className={styles.app}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.content}>
        {children}
      </div>
      <Notifications />
    </div>
  );
}

Shell.propTypes = propTypes;
Shell.defaultProps = defaultProps;
