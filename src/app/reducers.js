import { combineReducers } from 'redux';
import createBity from './create-bity';
import setupAuth from './auth/data/setup';
import setupNotifications from './notifications/setup';
import setupSidebarMenu from './shell/menu/state/setup';
import { setupAccountInfoPage } from './account/account-info-page/state';
import { setupAccountInfo } from './account/account-info/state';
import { setup as setupOrdersHistory } from './orders/orders-history/data';
import { setup as setupCreateOrderPageState } from './orders/create-order-page/state';
import { setup as setupPaymentMethodsStore } from './common-data/payment-methods';
import { setup as setupConversionRatesStore } from './common-data/conversion-rates';

const bity = createBity();

let cfg = {
  reducers: {},
  sagas: []
};

cfg = setupAuth(cfg, bity);
cfg = setupNotifications(cfg);
cfg = setupSidebarMenu(cfg);
cfg = setupAccountInfoPage(cfg);
cfg = setupAccountInfo(cfg, bity);
cfg = setupOrdersHistory(cfg, bity);
cfg = setupCreateOrderPageState(cfg, bity);
cfg = setupPaymentMethodsStore(cfg, bity);
cfg = setupConversionRatesStore(cfg, bity);

const { reducers, sagas } = cfg;
const reducer = combineReducers(reducers);

export { reducer, sagas };
