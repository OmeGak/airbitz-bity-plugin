const path = require('path');

// see https://github.com/ampedandwired/html-webpack-plugin#configuration
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

const htmlMinifierCfg = {
  removeComments: true,
  minifyJS: true,
  minifyCSS: true,
  collapseWhitespace: true
};

module.exports = function setupHtmlEntries(webpackCfg, { SRC_ROOT, IS_PRODUCTION_MODE }) {
  const { plugins = [] } = webpackCfg;

  const entries = [
    {
      filename: 'index.html',
      template: path.resolve(SRC_ROOT, 'index.html'),
      inlineSource: '.(js|css)$'
    }
  ];

  entries.forEach((entry) => {
    entry.minify = IS_PRODUCTION_MODE ? htmlMinifierCfg : false;
    entry.isProduction = IS_PRODUCTION_MODE;
  });

  // inline everything for release builds
  if (IS_PRODUCTION_MODE) {
    plugins.push(new HtmlWebpackInlineSourcePlugin());
  }

  // add HtmlWebpackPlugin for each HTML entry
  entries.forEach((entry) => {
    plugins.push(new HtmlWebpackPlugin(entry));
  });

  return Object.assign({}, webpackCfg, { plugins });
};
