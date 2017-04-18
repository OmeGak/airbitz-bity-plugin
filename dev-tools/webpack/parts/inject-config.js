const path = require('path');
const webpack = require('webpack');

const configKeyToFileNameMap = {
  dev: 'dev.js',
  prod: 'prod.js'
};

module.exports = function injectConfig(webpackCfg, { PROJECT_ROOT }, webpackEnv = {}) {
  const configFileName = getConfigFileName(webpackEnv);
  const configFilePath = path.resolve(PROJECT_ROOT, 'config', configFileName);
  const config = require(configFilePath); // eslint-disable-line global-require, import/no-dynamic-require

  const {
    plugins = []
  } = webpackCfg;

  const pluginInput = Object.keys(config)
    .reduce((acc, key) => {
      acc[`process.env.${key}`] = JSON.stringify(config[key]);
      return acc;
    }, {});

  plugins.push(new webpack.DefinePlugin(pluginInput));

  return Object.assign({}, webpackCfg, {
    plugins
  });
};

function getConfigFileName(webpackEnv) {
  const key = webpackEnv.config;
  if (typeof key === 'string' && key.length > 0) {
    return configKeyToFileNameMap[key];
  }

  const nodeEnv = process.env.NODE_ENV;
  switch (nodeEnv) {
    case 'production':
      return configKeyToFileNameMap.prod;
    default:
      return configKeyToFileNameMap.dev;
  }
}
