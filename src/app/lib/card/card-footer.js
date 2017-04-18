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

export default function CardFooter({ children, className: extraClassName }) {
  const className = classNames(styles.footer, extraClassName);

  return (
    <div className={className}>
      {children}
    </div>
  );
}

CardFooter.propTypes = propTypes;
CardFooter.defaultProps = defaultProps;
