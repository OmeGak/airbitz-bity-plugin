import React, { PropTypes } from 'react';
import classNames from 'classnames';
import styles from './styles.less';

const propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func
};

const defaultProps = {
  className: '',
  onClick: () => {}
};

export default function MenuButton({ onClick, title, className: extraClassName }) {
  const className = classNames(styles.btn, extraClassName);
  return (
    <div className={className} onClick={onClick}>
      <span className="menu-item__content">
        <i className="menu-item__icon" />
        <span className="menu-item__label">{title}</span>
      </span>
    </div>
  );
}

MenuButton.propTypes = propTypes;
MenuButton.defaultProps = defaultProps;
