import { take, spawn, put, call } from 'redux-saga/effects';
import { error as showErrorAction } from 'react-notification-system-redux';
import { actions as authStoreActions } from '../common-data/auth';
import * as actions from './actions';
import { parse } from '../../bity/errors';
import convertBityErrorToNotificationCfg from './convert-bity-error-to-notification-cfg';

/* eslint-disable import/no-extraneous-dependencies, import/first, import/extensions */
import * as airbitz from 'airbitzPluginApi';
/* eslint-enable import/no-extraneous-dependencies, import/first, import/extensions */

const listenMessages = [
  authStoreActions.ON_LOGIN_REQUEST_FAILED,
  actions.UNHANDLED_ERROR
];

export default function* run() {
  return yield [
    yield spawn(listen),
    yield spawn(listenNotifyIntents)
  ];
}

function* listen() {
  while (true) { // eslint-disable-line no-constant-condition
    const { payload: response } = yield take(listenMessages);
    const err = parse(response);
    const notificationCfg = convertBityErrorToNotificationCfg(err);
    yield put(showErrorAction(notificationCfg));
  }
}

function* listenNotifyIntents() {
  while (true) { // eslint-disable-line no-constant-condition
    const { payload: { title, msg } } = yield take(actions.NOTIFY);
    yield call(airbitz.ui.showAlert, title, msg);
  }
}
