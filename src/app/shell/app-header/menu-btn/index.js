import React, { PropTypes } from 'react';
import classNames from 'classnames';
import styles from './styles.less';

const propTypes = {
  className: PropTypes.string,
  inverted: PropTypes.bool
};

const defaultProps = {
  className: '',
  inverted: false
};

export default function MenuBtn({ className: extraClassName, inverted }) {
  const className = classNames(styles.menu, extraClassName, {
    [styles.menuInverted]: inverted
  });

  return (
    <div className={className}>
      <div className={styles.bar} />
      <div className={styles.bar} />
      <div className={styles.bar} />
    </div>
  );
}

MenuBtn.propTypes = propTypes;
MenuBtn.defaultProps = defaultProps;
