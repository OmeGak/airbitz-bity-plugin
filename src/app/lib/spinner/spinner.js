import React, { PropTypes } from 'react';
import classNames from 'classnames';
import './styles.less';

const spinnerTypes = {
  PAGE_LOADING: 'page-loading',
  INLINE: 'inline',
  CARD: 'card'
};

const mapTypeToClassName = {
  [spinnerTypes.PAGE_LOADING]: 'spinner--page-loading',
  [spinnerTypes.INLINE]: 'spinner--inline',
  [spinnerTypes.CARD]: 'spinner--card'
};

const propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(Object.values(spinnerTypes)).isRequired
};

const defaultProps = {
  className: ''
};

export default function Spinner({ className: extraClassName, type }) {
  const spinnerClassName = classNames(mapTypeToClassName[type], extraClassName);
  const barClassName = 'spinner__bar';

  return (
    <div className={spinnerClassName}>
      <div className={barClassName} />
      <div className={barClassName} />
      <div className={barClassName} />
      <div className={barClassName} />
      <div className={barClassName} />
    </div>
  );
}

Spinner.propTypes = propTypes;
Spinner.defaultProps = defaultProps;
