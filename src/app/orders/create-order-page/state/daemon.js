import { take, put, race, spawn, call } from 'redux-saga/effects';
import * as actions from './actions';
import { actions as paymentMethodsActions } from '../../../common-data/payment-methods';
import { actions as conversionRatesActions } from '../../../common-data/conversion-rates';

export default function createOrderPageDaemonFactory() {
  return function* runCreateOrderPageDaemon() {
    yield [
      yield spawn(onPageMounted)
    ];
  }
}

function* onPageMounted() {
  while (true) {
    yield take(actions.MOUNTED);
    const { pageData, unmounted } = yield race({
      pageData: call(preloadPageData),
      unmounted: take(actions.UNMOUNTED)
    });

    if (typeof unmounted !== 'undefined') {
      continue;
    }

    if (pageData.error === true) {
      // TODO on page error
      continue;
    }

    yield put(actions.ready());
  }
}

function* preloadPageData() {
  const [paymentMethods = {}, conversionRates = {}] = yield [
    call(preloadPaymentMethods),
    call(preloadConversionRates)
  ];
  const hasError = paymentMethods.error === true || conversionRates.error === true;
  return { error: hasError };
}

function* preloadPaymentMethods() {
  yield put(paymentMethodsActions.fetchPaymentMethods());

  const { alreadyHasData, succeed } = yield race({
    alreadyHasData: take(paymentMethodsActions.ALREADY_HAS_DATA),
    succeed: take(paymentMethodsActions.FETCH_SUCCEED),
    failed: take(paymentMethodsActions.FETCH_FAILED)
  });

  if (typeof alreadyHasData !== 'undefined' || succeed !== 'undefined') {
    return { error: false };
  }
  return { error: true };
}

function* preloadConversionRates() {
  yield put(conversionRatesActions.fetchRates());

  const { alreadyHasData, succeed } = yield race({
    alreadyHasData: take(conversionRatesActions.ALREADY_HAS_DATA),
    succeed: take(conversionRatesActions.FETCH_SUCCEED),
    failed: take(conversionRatesActions.FETCH_FAILED)
  });

  if (typeof alreadyHasData !== 'undefined' || succeed !== 'undefined') {
    return { error: false };
  }
  return { error: true };
} 
