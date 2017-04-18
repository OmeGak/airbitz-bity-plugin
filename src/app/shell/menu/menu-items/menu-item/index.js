import React, { PropTypes } from 'react';
import styles from './styles.less';

const propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func
};

const defaultProps = {
  children: null,
  onClick: () => {}
};

export default function MenuItem({ children, onClick }) {
  return (
    <div className={styles.menuItem} onClick={onClick}>
      {children}
    </div>
  );
}

MenuItem.propTypes = propTypes;
MenuItem.defaultProps = defaultProps;
