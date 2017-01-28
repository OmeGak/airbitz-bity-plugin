import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Link from '../../../../lib/link';
import styles from './styles.less';

const propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.string
};

const defaultProps = {
  className: ''
};

export default function MenuLink(props) {
  const { to, title, className: extraClassName, ...rest } = props;
  const className = classNames(styles.link, extraClassName);
  return (
    <Link className={className} activeClassName={styles.activeLink} to={to} {...rest}>
      <span className="menu-item__content">
        <i className="menu-item__icon" />
        <span className="menu-item__label">{title}</span>
      </span>
    </Link>
  );
}

MenuLink.propTypes = propTypes;
MenuLink.defaultProps = defaultProps;
