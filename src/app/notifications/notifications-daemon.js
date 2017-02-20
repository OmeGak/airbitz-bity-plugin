import { take, spawn, put } from 'redux-saga/effects';
import { error as showErrorAction } from 'react-notification-system-redux';
import { actions as authStoreActions } from '../common-data/auth';
import * as actions from './actions';
import { parse } from '../../bity/errors';
import convertBityErrorToNotificationCfg from './convert-bity-error-to-notification-cfg';

const listenMessages = [
  authStoreActions.ON_LOGIN_REQUEST_FAILED,
  actions.UNHANDLED_ERROR
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
