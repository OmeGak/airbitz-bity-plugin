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

export default function Card({ children, className: extraClassName }) {
  const cardClassName = classNames(styles.card, extraClassName);

  return (
    <div className={cardClassName}>
      {children}
    </div>
  );
}

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;
