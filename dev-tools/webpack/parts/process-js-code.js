module.exports = function setupProcessingOfJsCode(webpackCfg) {
  const { module: prevModule = {} } = webpackCfg;

  const { rules = [] } = prevModule;
  rules.push({
    test: /\.js$/,
    use: [
      {
        loader: 'babel-loader'
      }
    ],
    exclude: /node_modules/
  });

  const { noParse = [] } = prevModule;
  noParse.push(/\.min\.js/);

  const module = Object.assign({}, prevModule, { noParse, rules });

  return Object.assign({}, webpackCfg, { module });
};
