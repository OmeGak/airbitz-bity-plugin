const path = require('path');

module.exports = function setupJsEntries(webpackCfg, extraCfg) {
  const { SRC_ROOT, IS_TEST_MODE } = extraCfg;

  if (IS_TEST_MODE) {
    // we need an empty `entry` for karma
    return Object.assign({}, webpackCfg, {
      entry: null
    });
  }

  const entries = {
    main: path.resolve(SRC_ROOT, 'boot.js')
  };

  return Object.assign({}, webpackCfg, {
    entry: entries
  });
};
