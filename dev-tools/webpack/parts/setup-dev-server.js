const os = require('os');

const host = os.platform() === 'linux' ? '0.0.0.0' : '127.0.0.1';
const port = 3000;

module.exports = function setupDevServer(webpackCfg, { SRC_ROOT, IS_DEV_MODE }) {
  if (!IS_DEV_MODE) {
    return webpackCfg;
  }

  return Object.assign({}, webpackCfg, {
    devServer: {
      host,
      port,
      historyApiFallback: true,
      stats: 'minimal',
      contentBase: SRC_ROOT
    }
  });
};
