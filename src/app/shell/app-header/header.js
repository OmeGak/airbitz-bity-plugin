import React from 'react';
import styles from './styles.less';

import Logo from './logo';
import MenuBtn from './menu-btn';

export default function AppHeader() {
  return (
    <div className={styles.header}>
      <div className={styles.logoWrapper}>
        <Logo className={styles.logo} />
      </div>
      <div className={styles.menuBtnWrapper}>
        <MenuBtn className={styles.menuBtn} />
      </div>
    </div>
  );
}
