import React, { PropTypes } from 'react';
import styles from './styles.less';

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {
  children: null
};

export default function CardBody({ children }) {
  return (
    <div className={styles.body}>
      {children}
    </div>
  );
}

CardBody.propTypes = propTypes;
CardBody.defaultProps = defaultProps;
