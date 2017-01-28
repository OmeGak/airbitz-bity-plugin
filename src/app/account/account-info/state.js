import { take, put, spawn, call, select, race } from 'redux-saga/effects';
import * as authActions from '../../auth/data/actions';
import * as authSelectors from '../../auth/data/selectors';

const prefix = 'accountInfo';
const mountPoint = prefix;

// --------------------------
// setup
// --------------------------
export function setupAccountInfo(cfg = {}, bity) {
  const { reducers: prevReducers = {}, sagas: prevSagas = [] } = cfg;

  const reducers = {
    ...prevReducers,
    [mountPoint]: accountInfoReducer
  };

  const sagas = [
    ...prevSagas,
    accountInfoDaemonFactory(bity)
  ];

  return {
    ...cfg,
    reducers,
    sagas
  };
}

// --------------------------
// actions
// --------------------------
export const ACCOUNT_INFO_REQUESTED = `${prefix}::ACCOUNT_INFO_REQUESTED`;
export function fetchAccountInfo() {
  return {
    type: ACCOUNT_INFO_REQUESTED
  };
}

export const ACCOUNT_INFO_LOADING_STARTED = `${prefix}::ACCOUNT_INFO_LOADING_STARTED`;
export function accountInfoLoadingStarted() {
  return {
    type: ACCOUNT_INFO_LOADING_STARTED
  };
}

export const ACCOUNT_INFO_LOADING_SUCCEED = `${prefix}::ACCOUNT_INFO_LOADING_SUCCEED`;
export function accountInfoLoadingSucceed({ userName, email }) {
  return {
    type: ACCOUNT_INFO_LOADING_SUCCEED,
    payload: { userName, email }
  };
}

export const ACCOUNT_INFO_LOADING_FAILED = `${prefix}::ACCOUNT_INFO_LOADING_FAILED`;
export function accountInfoLoadingFailed(reason) {
  return {
    type: ACCOUNT_INFO_LOADING_FAILED,
    payload: reason
  };
}

export const ACCOUNT_INFO_LOADING_CANCELED = `${prefix}::ACCOUNT_INFO_LOADING_CANCELED`;
export function accountInfoLoadingCanceled() {
  return {
    type: ACCOUNT_INFO_LOADING_CANCELED
  };
}

export const ACCOUNT_INFO_HAS_BEEN_RESET = `${prefix}::ACCOUNT_INFO_HAS_BEEN_RESET`;
export function resetAccountInfo() {
  return {
    type: ACCOUNT_INFO_HAS_BEEN_RESET
  };
}

// --------------------------
// reducer
// --------------------------
const initialState = {
  data: {
    userName: '',
    email: ''
  },
  hasData: false,
  request: {
    started: false,
    failed: false
  }
};

export function accountInfoReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACCOUNT_INFO_HAS_BEEN_RESET:
      return onReset(state, action);
    case ACCOUNT_INFO_LOADING_STARTED:
      return onLoadingStarted(state, action);
    case ACCOUNT_INFO_LOADING_FAILED:
      return onLoadingFailed(state, action);
    case ACCOUNT_INFO_LOADING_SUCCEED:
      return onLoadingSucceed(state, action);
    case ACCOUNT_INFO_LOADING_CANCELED:
      return onLoadingCanceled(state, action);
    default:
      return state;
  }
}

function onReset() {
  return { ...initialState };
}

function onLoadingStarted(state) {
  return {
    ...state,
    data: { ...initialState.data },
    hasData: false,
    request: {
      started: true,
      failed: false
    }
  };
}

function onLoadingFailed(state) {
  return {
    ...state,
    request: {
      started: false,
      failed: true
    }
  };
}

function onLoadingSucceed(state, action) {
  const { payload: { email, userName } } = action;
  return {
    ...state,
    data: { email, userName },
    hasData: true,
    request: {
      started: false,
      failed: false
    }
  };
}

function onLoadingCanceled(state) {
  return {
    ...state,
    request: {
      started: false,
      failed: false
    }
  };
}

// --------------------------
// selectors
// --------------------------
export function hasData(state) {
  return state[mountPoint].hasData === true;
}

export function getData(state) {
  return { ...state[mountPoint].data };
}

// --------------------------
// saga
// --------------------------
function accountInfoDaemonFactory(bity) {
  return function* runAccountInfoDaemon() {
    yield [
      yield spawn(listenFetchAccountInfoRequests, bity),
      yield spawn(listenUnauthEvent)
    ];
  };
}

function* listenFetchAccountInfoRequests(bity) {
  while (true) { // eslint-disable-line no-constant-condition
    yield take(ACCOUNT_INFO_REQUESTED);

    const isAuthenticated = yield select(authSelectors.isAuthenticated);
    const hasAccountData = yield select(hasData);
    if (!isAuthenticated || hasAccountData) {
      continue; // eslint-disable-line no-continue
    }

    yield put(accountInfoLoadingStarted());

    const { fetchResult, unAuth } = yield race({
      fetchResult: call(fetchAccountInfoData, bity),
      unAuth: take(authActions.UNAUTHENTICATED)
    });

    if (typeof unAuth !== 'undefined') {
      yield put(accountInfoLoadingCanceled());
      continue; // eslint-disable-line no-continue
    }

    const { data, error } = fetchResult;
    if (error !== null) {
      yield put(accountInfoLoadingFailed(error));
    } else {
      yield put(accountInfoLoadingSucceed(data));
    }
  }
}

function* fetchAccountInfoData(bity) {
  try {
    const data = yield call(bity.account.info.fetch);
    return { data, error: null };
  } catch (e) {
    return { data: null, error: e };
  }
}

function* listenUnauthEvent() {
  while (true) { // eslint-disable-line no-constant-condition
    yield take(authActions.UNAUTHENTICATED);
    yield put(resetAccountInfo());
  }
}
