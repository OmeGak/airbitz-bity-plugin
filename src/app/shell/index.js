import React, { PropTypes } from 'react';
import Header from './app-header';
import Footer from './footer';
import Menu from './menu';
import styles from './styles.less';

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {
  children: null
};

export default function Shell({ children }) {
  return (
    <div className={styles.root}>
      <Menu />
      <div className={styles.app}>
        <div className={styles.header}>
          <Header />
        </div>
        <div className={styles.content}>
          {children}
        </div>
        <Footer />
      </div>
    </div>
  );
}

Shell.propTypes = propTypes;
Shell.defaultProps = defaultProps;
