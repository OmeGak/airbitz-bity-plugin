const webpack = require('webpack');

module.exports = function createWebpackConfigSeed({ NODE_ENV, PROJECT_ROOT }) {
  return {
    context: PROJECT_ROOT,
    target: 'web',
    entry: null,
    output: {},
    module: {
      rules: [],
      loaders: [],
      noParse: []
    },
    resolve: {
      alias: {}
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(NODE_ENV)
        }
      })
    ],
    externals: []
  };
};
