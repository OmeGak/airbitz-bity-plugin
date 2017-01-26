import React, { PropTypes } from 'react';
import Link from '../../../../lib/link';
import styles from './styles.less';

const propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

const defaultProps = {};

export default function MenuLink(props) {
  const { to, title, ...rest } = props;
  return (
    <Link className={styles.link} activeClassName={styles.activeLink} to={to} {...rest}>{title}</Link>
  );
}

MenuLink.propTypes = propTypes;
MenuLink.defaultProps = defaultProps;
