const ASSETS_ROOT = 'assets';

module.exports = function setupProcessingOfAssets(webpackCfg, extraCfg) {
  const { module: prevModule = {} } = webpackCfg;
  const { rules = [] } = prevModule;
  const { IS_TEST_MODE, IS_PRODUCTION_MODE } = extraCfg;

  const filename = '[name]_[hash].[ext]';

  const nullLoaderCfg = {
    loader: 'null-loader'
  };

  const fileLoaderCfg = {
    loader: 'file-loader',
    options: {
      name: `${ASSETS_ROOT}/${filename}`
    }
  };

  const urlLoaderCfg = {
    loader: 'url-loader',
    options: {
      // limit: 1000, // inline all assets everything
      name: `${ASSETS_ROOT}/${filename}`
    }
  };

  // ---------
  // image files
  // ---------
  const imageFileLoader = IS_TEST_MODE ? [nullLoaderCfg] : [urlLoaderCfg];
  if (IS_PRODUCTION_MODE) {
    imageFileLoader.push({
      loader: 'image-webpack-loader',
      options: {}
    });
  }

  rules.push({
    test: /\.(gif|png|jpe?g|ico)$/,
    use: imageFileLoader
  });

  // -----------
  // fonts
  // -----------
  const fontFileLoaders = IS_TEST_MODE ? [nullLoaderCfg] : [fileLoaderCfg];

  rules.push({
    test: /\.(eot|svg|ttf|woff|woff2)$/,
    use: fontFileLoaders
  });

  const module = Object.assign({}, prevModule, { rules });
  return Object.assign({}, webpackCfg, { module });
};
