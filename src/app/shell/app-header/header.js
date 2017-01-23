import React, { PropTypes } from 'react';
import classNames from 'classnames';
import styles from './styles.less';

import Logo from './logo';
import MenuBtn from './menu-btn';

const propTypes = {
  inverted: PropTypes.bool
};

const defaultProps = {
  inverted: false
};

export default function AppHeader({ inverted }) {
  const className = classNames(styles.header, {
    [styles.inverted]: inverted
  });

  return (
    <div className={className}>
      <div className={styles.logoWrapper}>
        <Logo className={styles.logo} inverted={inverted} />
      </div>
      <div className={styles.menuBtnWrapper}>
        <MenuBtn className={styles.menuBtn} inverted={inverted} />
      </div>
    </div>
  );
}

AppHeader.propTypes = propTypes;
AppHeader.defaultProps = defaultProps;
