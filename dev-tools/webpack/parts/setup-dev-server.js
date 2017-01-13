const os = require('os');
const webpack = require('webpack');

const host = os.platform() === 'linux' ? '0.0.0.0' : '127.0.0.1';
const port = 3000;

module.exports = function setupDevServer(webpackCfg, { SRC_ROOT, IS_DEV_MODE }) {
  if (!IS_DEV_MODE) {
    return webpackCfg;
  }

  const devServerCfg = {
    host,
    port,
    hot: true,
    historyApiFallback: true,
    stats: 'minimal',
    contentBase: SRC_ROOT
  };

  const { entry: prevEntries, plugins: prevPlugins = [] } = webpackCfg;

  const plugins = [].concat(prevPlugins, [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]);

  const entries = Object.keys(prevEntries).reduce((acc, id) => {
    acc[id] = [
      'react-hot-loader/patch',
      // `webpack-dev-server/client?http://${host}:${port}/`,
      // 'webpack/hot/only-dev-server',
      prevEntries[id]
    ];
    return acc;
  }, {});

  return Object.assign({}, webpackCfg, {
    devServer: devServerCfg,
    entry: entries,
    plugins
  });
};
