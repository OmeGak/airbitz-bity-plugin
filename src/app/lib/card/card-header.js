import React, { PropTypes } from 'react';
import styles from './styles.less';

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {
  children: null
};

export default function CardHeader({ children }) {
  return (
    <div className={styles.header}>
      {children}
    </div>
  );
}

CardHeader.propTypes = propTypes;
CardHeader.defaultProps = defaultProps;
