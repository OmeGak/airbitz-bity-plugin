import { take, put, select, race } from 'redux-saga/effects';
import {
  hasData,
  fetchAccountInfo,
  ACCOUNT_INFO_LOADING_SUCCEED,
  ACCOUNT_INFO_LOADING_FAILED
} from '../account-info/state';

const prefix = 'accountInfoPage';
const mountPoint = 'accountInfoPage';

// --------------------------
// setup
// --------------------------
export function setupAccountInfoPage(cfg = {}) {
  const { reducers: prevReducers = {}, sagas: prevSagas = [] } = cfg;

  const reducers = {
    ...prevReducers,
    [mountPoint]: accountInfoPageReducer
  };

  const sagas = [
    ...prevSagas,
    prepareAccountInfoPage
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
export const MOUNTED = `${prefix}::MOUNTED`;
export function onMounted() {
  return {
    type: MOUNTED
  };
}

export const UNMOUNTED = `${prefix}::UNMOUNTED`;
export function onUnmounted() {
  return {
    type: UNMOUNTED
  };
}

export const READY = `${prefix}::READY`;
export function onReady() {
  return {
    type: READY
  };
}

// --------------------------
// reducer
// --------------------------
const initialState = {
  ready: false
};

function accountInfoPageReducer(state = initialState, action = {}) {
  switch (action.type) {
    case UNMOUNTED:
      return { ...initialState };
    case READY:
      return {
        ...state,
        ready: true
      };
    default:
      return state;
  }
}

// --------------------------
// selectors
// --------------------------
export function isReady(state) {
  return state[mountPoint].ready === true;
}

// --------------------------
// saga
// --------------------------
function* prepareAccountInfoPage() {
  while (true) { // eslint-disable-line no-constant-condition
    yield take(MOUNTED);

    const hasAccountInfoData = yield select(hasData);
    if (hasAccountInfoData) {
      yield put(onReady());
      continue; // eslint-disable-line no-continue
    }

    yield put(fetchAccountInfo());

    const { failed, unmounted } = yield race({
      succeed: take(ACCOUNT_INFO_LOADING_SUCCEED),
      failed: take(ACCOUNT_INFO_LOADING_FAILED),
      unmounted: take(UNMOUNTED)
    });

    if (typeof unmounted !== 'undefined' || typeof failed !== 'undefined') {
      // we expects that all errors will be handled by another part of the app
      continue; // eslint-disable-line no-continue
    }

    yield put(onReady());
  }
}
