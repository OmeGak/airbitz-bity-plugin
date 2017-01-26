import React, { PropTypes } from 'react';
import styles from './styles.less';

const propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

const defaultProps = {
  onClick: () => {}
};

export default function MenuButton({ onClick, title }) {
  return (
    <div className={styles.btn} onClick={onClick}>{title}</div>
  );
}

MenuButton.propTypes = propTypes;
MenuButton.defaultProps = defaultProps;
