import React, { PropTypes } from 'react';
import classNames from 'classnames';
import styles from './styles.less';
import img from './assets/logo-white.png';

const propTypes = {
  className: PropTypes.string
};

const defaultProps = {
  className: ''
};

export default function Logo({ className: extraClassName = '' }) {
  const className = classNames(styles.logo, extraClassName);
  return (
    <img className={className} src={img} />
  );
}

Logo.propTypes = propTypes;
Logo.defaultProps = defaultProps;
