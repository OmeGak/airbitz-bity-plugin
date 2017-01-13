import React, { PropTypes } from 'react';
import classNames from 'classnames';
import styles from './styles.less';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

const defaultProps = {
  children: null,
  className: ''
};

export default function Page({ children, className: extraClassName }) {
  const className = classNames(styles.page, extraClassName);
  return (
    <div className={className}>
      {children}
    </div>
  );
}

Page.propTypes = propTypes;
Page.defaultProps = defaultProps;
