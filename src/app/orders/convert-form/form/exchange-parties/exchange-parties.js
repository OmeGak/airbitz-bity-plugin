import React from 'react';
import styles from '../form.less';

import InputExchangePartyWidget from './input-exchange-party.container';
import OutputExchangePartyWidget from './output-exchange-party.container';
import SwapBtn from './swap-btn.container';

export default function ExchangeParties() {
  return (
    <div className={styles.exchangeParties}>
      <div className={styles.exchangePartyContainer}>
        <InputExchangePartyWidget />
      </div>
      <div className={styles.swapPartiesBtn}>
        <SwapBtn />
      </div>
      <div className={styles.exchangePartyContainer}>
        <OutputExchangePartyWidget />
      </div>
    </div>
  );
}
