if (process.env.IS_AIRBITZ_RELEASE !== true) {
  require('airbitzPluginApi'); // eslint-disable-line global-require, import/no-extraneous-dependencies
}

import airbitzStorageFactory from './storage'; // eslint-disable-line import/first

export { airbitzStorageFactory };
