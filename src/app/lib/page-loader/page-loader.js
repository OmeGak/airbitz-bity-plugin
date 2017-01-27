import React from 'react';
import Spinner from '../spinner';
import styles from './styles.less';

export default function PageLoader() {
  return (
    <div className={styles.root}>
      <Spinner className={styles.spinner} type="page-loading" />
    </div>
  );
}
