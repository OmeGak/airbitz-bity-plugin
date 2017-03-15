/* eslint-disable */
import { spawn, take } from 'redux-saga/effects';
import { actions as authStoreActions } from '../auth';
import * as actions from './actions';

export default function exchangeOrderDaemonFactory(bity) {
  return function* runExchangeOrderDaemon() {
    yield [
      // yield spawn(listenUnauth),
      // yield spawn(listenFetchIntents, bity)
      yield spawn(listenCreateOrderIntents)
    ];
  };
}

function* listenCreateOrderIntents() {
  while (true) {
    const { payload } = yield take(actions.CREATE);
    console.log(payload);
  }
}

function* fiatToCrypto() {
  
}

function* cryptoToFiat() {
  
}
