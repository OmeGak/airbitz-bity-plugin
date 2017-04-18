import React, { PropTypes } from 'react';
import classNames from 'classnames';
import styles from './styles.less';

const propTypes = {
  className: PropTypes.string,
  inverted: PropTypes.bool,
  onClick: PropTypes.func
};

const defaultProps = {
  className: '',
  inverted: false,
  onClick: () => {}
};

export default function MenuBtn({ className: extraClassName, inverted, onClick }) {
  const className = classNames(styles.menu, extraClassName, {
    [styles.inverted]: inverted
  });

  return (
    <div className={className} onClick={onClick}>
      <div className={styles.bar} />
      <div className={styles.bar} />
      <div className={styles.bar} />
    </div>
  );
}

MenuBtn.propTypes = propTypes;
MenuBtn.defaultProps = defaultProps;
