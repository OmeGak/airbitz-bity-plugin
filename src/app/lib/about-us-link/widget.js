import React from 'react';
import Link from '../link';

import styles from './styles.less';

export default function AboutUsLink() {
  return (
    <div className={styles.root}>
      <Link to="/about-us">About Us</Link>
    </div>
  );
}
