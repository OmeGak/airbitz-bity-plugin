import React, { PropTypes } from 'react';
import styles from './styles.less';

const propTypes = {
  onPrev: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  showPrevBtn: PropTypes.bool.isRequired,
  showNextBtn: PropTypes.bool.isRequired
};

const defaultProps = {};

export default function OrdersListNav({ showPrevBtn, showNextBtn, onPrev, onNext }) {
  const prevBtn = !showPrevBtn ?
    null : <div className={styles.navBtn} onClick={onPrev}>&lt;&lt; Previous</div>;

  const nextBtn = !showNextBtn ?
    null : <div className={styles.navBtn} onClick={onNext}>Next &gt;&gt;</div>;

  if (prevBtn === null && nextBtn === null) {
    return null;
  }

  return (
    <div className={styles.nav}>
      <div className={styles.navInner}>
        {prevBtn}
        {nextBtn}
      </div>
    </div>
  );
}

OrdersListNav.propTypes = propTypes;
OrdersListNav.defaultProps = defaultProps;
