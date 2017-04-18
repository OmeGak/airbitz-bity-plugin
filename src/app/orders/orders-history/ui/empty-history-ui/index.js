import React from 'react';
import styles from './styles.less';

export default function EmptyHistoryUI() {
  return (
    <div className={styles.message}>You don&apos;t have any order yet</div>
  );
}
