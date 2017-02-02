import { spawn, take, put, call, race, select } from 'redux-saga/effects';
import * as actions from './actions';
import * as selectors from './selectors';
import * as notificationActions from '../../../notifications/actions';

const ITEMS_PER_PAGE = 5;

const defaultQuery = {
  order_by: '-timestamp_created',
  limit: ITEMS_PER_PAGE,
  offset: 0
};

export default function ordersHistoryDaemonFactory(bity) {
  return function* runOrdersHistoryDaemon() {
    yield [
      yield spawn(listenFetchOrdersRequests, bity)
    ];
  };
}

function* listenFetchOrdersRequests(bity) {
  while (true) { // eslint-disable-line no-constant-condition
    const { fetchNextPage, fetchPrevPage } = yield race({
      fetchFirstPage: take(actions.FETCH_REQUESTED),
      fetchNextPage: take(actions.FETCH_OF_NEXT_PAGE_REQUESTED),
      fetchPrevPage: take(actions.FETCH_OF_PREV_PAGE_REQUESTED)
    });

    const currentPageIndex = yield select(selectors.getPageIndex);

    let pageIndex;
    switch (true) {
      case typeof fetchNextPage !== 'undefined':
        pageIndex = currentPageIndex + 1;
        break;
      case typeof fetchPrevPage !== 'undefined':
        pageIndex = currentPageIndex - 1;
        break;
      default:
        pageIndex = 0;
    }

    const query = {
      ...defaultQuery,
      offset: pageIndex * ITEMS_PER_PAGE
    };

    yield put(actions.onFetchStarted());

    const { res, canceled } = yield race({
      res: call(fetchData, bity, query),
      canceled: take(actions.CANCEL)
    });

    if (typeof canceled !== 'undefined') {
      yield put(actions.onFetchCanceled());
      continue; // eslint-disable-line no-continue
    }

    const { data, error } = res;
    if (error !== null) {
      yield put(actions.onFetchFailed());
      yield put(notificationActions.unhandledError(error));
      continue; // eslint-disable-line no-continue
    }

    const { orders, meta } = data;
    yield put(actions.onFetchSucceed({ orders, meta, pageIndex }));
  }
}

function* fetchData(bity, query) {
  try {
    const data = yield call(bity.orders.fetchListOfOrders, query);
    return { data, error: null };
  } catch (e) {
    return { data: null, error: e };
  }
}
