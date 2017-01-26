import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './styles.less';

const propTypes = {
  href: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

const defaultProps = {
  onClick() {}
};

export default function MenuItem({ href, title, onClick }) {
  return (
    <div className={styles.menuItem} onClick={onClick}>
      <Link to={href} activeClassName={styles.activeLink}>{title}</Link>
    </div>
  );
}

MenuItem.propTypes = propTypes;
MenuItem.defaultProps = defaultProps;
