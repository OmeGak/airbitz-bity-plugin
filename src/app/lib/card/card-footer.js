import React, { PropTypes } from 'react';
import styles from './styles.less';

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {
  children: null
};

export default function CardFooter({ children }) {
  return (
    <div className={styles.footer}>
      {children}
    </div>
  );
}

CardFooter.propTypes = propTypes;
CardFooter.defaultProps = defaultProps;
