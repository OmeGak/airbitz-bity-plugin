import React, { PropTypes } from 'react';
import styles from './styles.less';

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {
  children: null
};

export default function ErrorMsg({ children }) {
  return (
    <div className={styles.errorMsg}>
      <span>{children}</span>
    </div>
  );
}

ErrorMsg.propTypes = propTypes;
ErrorMsg.defaultProps = defaultProps;
