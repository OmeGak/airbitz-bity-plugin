import authFactory from './auth';
import ajaxFactory from './ajax';
import prefixPluginFactory from './ajax/plugins/prefix-plugin';
import cookiesStorageFactory from './storage/cookies-storage';

export default function createBityInstance(opts = {}) {
  const {
    clientId,
    host = '/',
    storage: externalStorage
  } = opts;

  let storage;
  if (typeof externalStorage === 'undefined') {
    storage = cookiesStorageFactory();
  } else {
    storage = externalStorage;
  }

  const { authAjaxPlugin, authApiFactory } = authFactory({
    clientId,
    storage
  });

  const baseAjax = ajaxFactory();

  // ajax used for auth requests
  // 1) ajax requests for auth uses different URL prefix
  // 2) we do not need to sign the ajax requests for auth
  const ajaxForAuth = prefixPluginFactory(host)(baseAjax);

  // ajax used for REST API requests
  let ajaxForApi = authAjaxPlugin(baseAjax); // eslint-disable-line no-unused-vars
  ajaxForApi = prefixPluginFactory(host)(baseAjax);

  return {
    auth: authApiFactory(ajaxForAuth)
  };
}
