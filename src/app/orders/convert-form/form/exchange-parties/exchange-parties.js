import React from 'react';
import styles from '../form.less';
import localStyles from './styles.less';
import arrowImg from './assets/long-arrow-right.svg';

import InputExchangePartyWidget from './input-exchange-party.container';
import OutputExchangePartyWidget from './output-exchange-party.container';

export default function ExchangeParties() {
  return (
    <div className={styles.exchangeParties}>
      <div className={styles.exchangePartyContainer}>
        <InputExchangePartyWidget />
      </div>
      <div className={styles.swapPartiesBtn}>
        <img className={localStyles.arrow} src={arrowImg} />
      </div>
      <div className={styles.exchangePartyContainer}>
        <OutputExchangePartyWidget />
      </div>
    </div>
  );
}
