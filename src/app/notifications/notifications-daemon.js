import { take, spawn, put } from 'redux-saga/effects';
import { error as showErrorAction } from 'react-notification-system-redux';
import * as actions from '../auth/data/actions';
import { parse } from '../../bity/errors';
import convertBityErrorToNotificationCfg from './convert-bity-error-to-notification-cfg';

const listenMessages = [
  actions.ON_LOGIN_REQUEST_FAILED
];

export default function* run() {
  return yield [
    yield spawn(listen)
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
