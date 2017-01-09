const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const styleLoaderCfg = {
  loader: 'style-loader'
};

const cssLoaderCfg = {
  loader: 'css-loader',
  options: {
    modules: false,
    camelCase: true,
    importLoaders: 1,
    localIdentName: '[local]'
  }
};

const lessLoaderCfg = {
  loader: 'less-loader',
  options: {}
};

const sassLoaderCfg = {
  loader: 'sass-loader',
  options: {}
};

const postCssLoaderCfg = {
  loader: 'postcss-loader'
};

const defaultLoaders = [
  styleLoaderCfg,
  cssLoaderCfg,
  postCssLoaderCfg
];

module.exports = function setupProcessingOfStylesheets(webpackCfg, { IS_PRODUCTION_MODE }) {
  const { plugins = [], module: prevModule = {} } = webpackCfg;
  const { rules = [] } = prevModule;

  rules.push(createRule(/\.css$/, defaultLoaders, null, IS_PRODUCTION_MODE));
  rules.push(createRule(/\.less$/, defaultLoaders, lessLoaderCfg, IS_PRODUCTION_MODE));
  rules.push(createRule(/\.(scss|sass)$/, defaultLoaders, sassLoaderCfg, IS_PRODUCTION_MODE));

  // ---------
  // configure postcss-loader
  // ---------
  const postCssLoaderOptions = {
    plugins: [
      autoprefixer
    ]
  };

  if (IS_PRODUCTION_MODE) {
    postCssLoaderOptions.plugins.push(cssnano);
  }

  plugins.push(new webpack.LoaderOptionsPlugin({
    test: /\.(css|less|scss|sass)$/,
    options: {
      postcss: postCssLoaderOptions
    }
  }));

  const module = Object.assign({}, prevModule, { rules });
  return Object.assign({}, webpackCfg, { module, plugins });
};

function createRule(test, defaultLoaders = [], extraLoaders = [], isProductionMode = false) {
  let allLoaders = defaultLoaders;
  if (typeof extraLoaders !== 'undefined' && extraLoaders !== null) {
    allLoaders = allLoaders.concat(extraLoaders);
  }

  if (!isProductionMode) {
    return {
      test,
      use: allLoaders
    };
  }

  return {
    test,
    // don't use `use` due this issue: https://github.com/webpack/extract-text-webpack-plugin/issues/265
    loader: ExtractTextPlugin.extract({
      fallbackLoader: 'style-loader',
      loader: allLoaders.slice(1) // without style-loader
    })
  };
}
