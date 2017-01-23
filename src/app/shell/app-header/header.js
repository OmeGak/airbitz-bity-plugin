import React from 'react';
import styles from './styles.less';

import Logo from './logo';

export default function AppHeader() {
  return (
    <div className={styles.header}>
      <div className={styles.logoWrapper}>
        <Logo className={styles.logo} />
      </div>
    </div>
  );
}
