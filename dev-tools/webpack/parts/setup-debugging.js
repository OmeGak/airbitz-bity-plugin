const webpack = require('webpack');

module.exports = function setupDebugging(webpackCfg, { IS_PRODUCTION_MODE }) {
  const { output: prevOutput = {} } = webpackCfg;
  const output = Object.assign({}, prevOutput, {
    pathinfo: !IS_PRODUCTION_MODE
  });

  const devtool = IS_PRODUCTION_MODE ? false : 'source-map';

  const { plugins = [] } = webpackCfg;
  plugins.push(new webpack.LoaderOptionsPlugin({
    debug: !IS_PRODUCTION_MODE
  }));

  const { performance = {} } = webpackCfg;
  performance.hints = IS_PRODUCTION_MODE ? 'warning' : false;

  return Object.assign({}, webpackCfg, { output, devtool, plugins, performance });
};
