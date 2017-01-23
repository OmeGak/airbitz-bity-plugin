import React, { PropTypes } from 'react';
import styles from './styles.less';

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {
  children: null
};

export default function Card({ children }) {
  return (
    <div className={styles.card}>
      {children}
    </div>
  );
}

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;
