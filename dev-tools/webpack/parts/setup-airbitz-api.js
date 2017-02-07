const path = require('path');

const platforms = {
  WEB: 'web',
  IOS: 'ios',
  ANDROID: 'android'
};

const allowedPlatformValues = Object.keys(platforms).map(key => platforms[key]);

const mapPlatformToBridgeFile = {
  [platforms.WEB]: 'airbitz-bridge-dev.js',
  [platforms.IOS]: 'airbitz-bridge-ios.js',
  [platforms.ANDROID]: 'airbitz-bridge-android.js'
};

module.exports = function setupAirbitzApi(webpackCfg, { PROJECT_ROOT }, webpackEnv = {}) {
  const { platform = platforms.WEB } = webpackEnv;
  if (allowedPlatformValues.indexOf(platform) === -1) {
    throw new Error(`Unknown value for platform: "${platform}"`);
  }

  const {
    externals = [],
    plugins = [],
    resolve: prevResolve = {},
    module: prevModule = {}
  } = webpackCfg;
  const { alias = {} } = prevResolve;
  const { rules = [] } = prevModule;

  if (externals.indexOf('window') === -1) {
    externals.push('window');
  }

  const pathPrefix = path.resolve(PROJECT_ROOT, 'node_modules/plugins.airbitz.org/lib/js/');

  // bridge
  const bridgeFileName = mapPlatformToBridgeFile[platform];
  alias.airbitzPluginBridge = path.resolve(pathPrefix, bridgeFileName);
  rules.push({
    test: /airbitz-bridge-[^.]+\.js/,
    use: [
      {
        loader: 'exports-loader?_bridge'
      }
    ]
  });

  // airbitz-core.js
  alias.airbitzPluginApi = path.resolve(pathPrefix, 'airbitz-core.js');
  rules.push({
    test: /airbitz-core\.js/,
    use: [
      {
        loader: 'imports-loader?_bridge=airbitzPluginBridge,this=>window'
      },
      {
        loader: 'exports-loader?window.Airbitz'
      }
    ]
  });

  const module = Object.assign({}, prevModule, { rules });
  const resolve = Object.assign({}, prevResolve, { alias });

  return Object.assign({}, webpackCfg, {
    externals,
    plugins,
    module,
    resolve
  });
};
