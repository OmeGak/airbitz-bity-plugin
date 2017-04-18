import { take, put, spawn, race, call, select } from 'redux-saga/effects';

import * as actions from './actions';
import * as selectors from './selectors';

import {
  actions as paymentMethodsStoreActions
} from '../../../common-data/payment-methods';

export default function orderDetailsPageDaemonFactory(bity) {
  return function* runConvertPageDaemon() {
    yield [
      yield spawn(preparePage, bity),
      yield spawn(onUnmounted),
      yield spawn(listenCancelOrderIntents, bity)
    ];
  };
}

function* onUnmounted() {
  while (true) { // eslint-disable-line no-constant-condition
    yield take(actions.UNMOUNTED);
    yield put(actions.reset());
  }
}

function* preparePage(bity) {
  while (true) { // eslint-disable-line no-constant-condition
    const { payload: orderId } = yield take(actions.MOUNTED);

    yield put(actions.preparationStarted());

    // ----------------------
    // make sure payment methods preloaded
    // ----------------------
    const paymentMethodsPreloading = yield call(preloadPaymentMethods);
    if (paymentMethodsPreloading.canceled || paymentMethodsPreloading.skipNextSteps) {
      continue; // eslint-disable-line no-continue
    }
    if (paymentMethodsPreloading.failed) {
      yield put(actions.preparationFailed());
      continue; // eslint-disable-line no-continue
    }

    const res = yield race({
      request: call(loadOrderDetails, bity, orderId),
      unmounted: take(actions.UNMOUNTED)
    });

    if (typeof res.unmounted !== 'undefined') {
      continue; // eslint-disable-line no-continue
    }

    if (res.request.error) {
      yield put(actions.preparationFailed());
      continue; // eslint-disable-line no-continue
    }

    yield put(actions.orderDetailsChanged(res.request.data));
    yield put(actions.preparationCompleted());

    yield take(actions.UNMOUNTED);
  }
}

function* listenCancelOrderIntents(bity) {
  while (true) { // eslint-disable-line no-constant-condition
    const { payload: orderId } = yield take(actions.CANCEL_ORDER);

    const res = yield race({
      request: call(sendCancelOrderRequest, bity, orderId),
      unmounted: take(actions.UNMOUNTED)
    });

    if (typeof res.unmounted !== 'undefined') {
      // TODO show notification if request succeed
      continue; // eslint-disable-line no-continue
    }

    if (res.request.error) {
      // TODO show notification if request failed
      continue; // eslint-disable-line no-continue
    }

    const isPreparationCompleted = yield select(selectors.isPreparationCompleted);
    if (!isPreparationCompleted) {
      continue; // eslint-disable-line no-continue
    }

    const { id: currentOrderId } = yield select(selectors.getOrderDetails);
    if (currentOrderId !== orderId) {
      // there is an UI for another order
      continue; // eslint-disable-line no-continue
    }

    yield put(actions.orderWasCanceled());
  }
}

function* loadOrderDetails(bity, orderId) {
  try {
    const data = yield call(bity.orders.getOrderDetails, orderId);
    return { data };
  } catch (error) {
    return { error };
  }
}

function* sendCancelOrderRequest(bity, orderId) {
  try {
    yield call(bity.orders.cancelOrder, orderId);
    return { success: true };
  } catch (e) {
    return { error: e };
  }
}

function* preloadPaymentMethods() {
  yield put(paymentMethodsStoreActions.fetchData());

  const res = yield race({
    unmounted: take(actions.UNMOUNTED),
    canceled: take(paymentMethodsStoreActions.FETCH_CANCELED),
    failed: take(paymentMethodsStoreActions.FETCH_FAILED),
    succeed: take(paymentMethodsStoreActions.FETCH_SUCCEED),
    alreadyHasData: take(paymentMethodsStoreActions.ALREADY_HAS_DATA)
  });

  if (typeof res.unmounted !== 'undefined' || typeof res.canceled !== 'undefined') {
    return { canceled: true };
  }

  if (typeof res.failed !== 'undefined') {
    return { failed: true };
  }

  return { success: true };
}
