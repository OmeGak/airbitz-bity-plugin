const path = require('path');
const createWebpackCfg = require('./dev-tools/webpack/webpack.cfg');

const testBundlePath = path.resolve(process.cwd(), './dev-tools/tests.webpack.js');

module.exports = function (cfg) {
  const data = {
    files: [
      testBundlePath
    ],
    browsers: [],
    plugins: [],
    frameworks: [],
    reporters: [
      'dots'
    ],
    preprocessors: {},
    singleRun: true
  };

  // PhantomJS
  data.browsers.push('PhantomJS');
  data.plugins.push('karma-phantomjs-launcher');

  // Jasmine
  data.frameworks.push('jasmine');
  data.plugins.push('karma-jasmine');

  // webpack
  data.plugins.push('karma-webpack');
  data.webpack = createWebpackCfg();
  data.webpackMiddleware = {
    noInfo: true
  };
  data.preprocessors[testBundlePath] = ['webpack'];

  cfg.set(data);
};
