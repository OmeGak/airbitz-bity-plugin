import { combineReducers } from 'redux';
import createBity from './create-bity';
import setupAuth from './auth/data/setup';
import setupNotifications from './notifications/setup';

const bity = createBity();

let cfg = {
  reducers: {},
  sagas: []
};

cfg = setupAuth(cfg, bity);
cfg = setupNotifications(cfg);

const { reducers, sagas } = cfg;
const reducer = combineReducers(reducers);

export { reducer, sagas };
