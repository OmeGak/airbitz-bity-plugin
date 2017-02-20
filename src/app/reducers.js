import { combineReducers } from 'redux';
import createBity from './create-bity';
import setupAuth from './auth/data/setup';
import setupNotifications from './notifications/setup';
import setupSidebarMenu from './shell/menu/state/setup';
import { setupAccountInfoPage } from './account/account-info-page/state';
import { setup as setupAccountInfoStore } from './common-data/account-info';
import { setup as setupOrdersHistory } from './orders/orders-history/data';
import { setup as setupPaymentMethodsStore } from './common-data/payment-methods';
import { setup as setupBankAccountsStore } from './common-data/bank-accounts';
import { setup as setupConvertPageState } from './orders/convert-page/state';
import { setup as setupQuotaStore } from './common-data/quota';
import { setup as setupQuotaExceededPageState } from './quota/quota-exceeded-page/state';
import { setup as setupPhoneStore } from './common-data/phone';
import { setup as setupPhoneNotVerifiedPageState } from './phone/phone-not-verified-page/state';
import { setup as setupExchangeRatesStore } from './common-data/exchange-rates';

const bity = createBity();

let cfg = {
  reducers: {},
  sagas: []
};

cfg = setupAuth(cfg, bity);
cfg = setupNotifications(cfg);
cfg = setupSidebarMenu(cfg);
cfg = setupAccountInfoPage(cfg);
cfg = setupAccountInfoStore(cfg, bity);
cfg = setupOrdersHistory(cfg, bity);
cfg = setupPaymentMethodsStore(cfg, bity);
cfg = setupBankAccountsStore(cfg, bity);
cfg = setupConvertPageState(cfg, bity);
cfg = setupQuotaStore(cfg, bity);
cfg = setupQuotaExceededPageState(cfg, bity);
cfg = setupPhoneStore(cfg, bity);
cfg = setupPhoneNotVerifiedPageState(cfg, bity);
cfg = setupExchangeRatesStore(cfg, bity);

const { reducers, sagas } = cfg;
const reducer = combineReducers(reducers);

export { reducer, sagas };
