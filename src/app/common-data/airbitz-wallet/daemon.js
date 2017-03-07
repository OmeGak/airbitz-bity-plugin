import { eventChannel } from 'redux-saga';
import { spawn, take, put, select, call } from 'redux-saga/effects';
/* eslint-disable import/no-extraneous-dependencies, import/extensions */
import * as airbitz from 'airbitzPluginApi';
/* eslint-enable import/no-extraneous-dependencies, import/extensions */
import * as actions from './actions';
import * as selectors from './selectors';

export default function airbitzWalletStoreDaemonFactory() {
  return function* runAirbitzWalletStoreDaemon() {
    yield [
      yield spawn(listenFetchIntents),
      yield spawn(listenWalletChanges)
    ];
  };
}

// --------------------------
// Airbitz.core.getSelectedWallet
// --------------------------
function* listenFetchIntents() {
  while (true) { // eslint-disable-line no-constant-condition
    yield take(actions.FETCH_DATA);

    const hasData = yield select(selectors.hasData);
    if (hasData) {
      yield put(actions.alreadyHasData());
      continue; // eslint-disable-line no-continue
    }

    yield put(actions.fetchStarted());

    const walletData = yield call(getSelectedWallet);
    yield put(actions.fetchSucceed(walletData));
  }
}

function getSelectedWallet() {
  return new Promise((resolve) => {
    airbitz.core.getSelectedWallet({
      success: resolve
    });
  });
}

// --------------------------
// Airbitz.core.setupWalletChangeListener
// --------------------------
function* listenWalletChanges() {
  const channel = yield call(walletChangeListener);
  while (true) { // eslint-disable-line no-constant-condition
    const walletData = yield take(channel);
    yield put(actions.dataChanged(walletData));
  }
}

function walletChangeListener() {
  return eventChannel((emitter) => {
    airbitz.core.setupWalletChangeListener((walletData) => {
      emitter(walletData);
    });

    return function unsubscribe() {};
  });
}
