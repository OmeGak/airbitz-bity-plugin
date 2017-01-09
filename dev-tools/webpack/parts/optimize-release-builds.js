const webpack = require('webpack');

// also see ./setup-debugging

module.exports = function optimizeReleaseBuilds(webpackCfg, { IS_PRODUCTION_MODE }) {
  if (!IS_PRODUCTION_MODE) {
    return webpackCfg;
  }

  const { plugins = [] } = webpackCfg;

  plugins.push(new webpack.LoaderOptionsPlugin({
    minimize: true
  }));

  plugins.push(new webpack.optimize.UglifyJsPlugin({
    sourceMap: false,
    compress: {
      warnings: false
    }
  }));

  plugins.push(new webpack.optimize.MinChunkSizePlugin({
    minChunkSize: 51200
  }));

  return Object.assign({}, webpackCfg, { plugins });
};
