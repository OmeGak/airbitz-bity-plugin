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

export default function CardBody({ children, className: extraClassName }) {
  const className = classNames(styles.body, extraClassName);

  return (
    <div className={className}>
      {children}
    </div>
  );
}

CardBody.propTypes = propTypes;
CardBody.defaultProps = defaultProps;
