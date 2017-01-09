module.exports = function setupProcessingOfHtmlTemplates(webpackCfg, { IS_PRODUCTION_MODE }) {
  const { module: prevModule = {} } = webpackCfg;
  const { rules = [] } = prevModule;

  rules.push({
    test: /\.(view|tpl).html/,
    use: {
      loader: 'html-loader',
      options: {
        minimize: IS_PRODUCTION_MODE
      }
    }
  });

  const module = Object.assign({}, prevModule, { rules });
  return Object.assign({}, webpackCfg, { module });
};
