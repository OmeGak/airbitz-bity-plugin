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

export default function CardHeader({ children, className: extraClassName }) {
  const className = classNames(styles.header, extraClassName);

  return (
    <div className={className}>
      {children}
    </div>
  );
}

CardHeader.propTypes = propTypes;
CardHeader.defaultProps = defaultProps;
