const webpack = require('webpack');

module.exports = function createWebpackConfigSeed({ NODE_ENV, PROJECT_ROOT }, webpackEnv = {}) {
  const isAirbitzRelease = webpackEnv['abc-release'] === true;

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
          NODE_ENV: JSON.stringify(NODE_ENV),
          IS_AIRBITZ_RELEASE: JSON.stringify(isAirbitzRelease)
        }
      })
    ],
    externals: []
  };
};
