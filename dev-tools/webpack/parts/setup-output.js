module.exports = function setupWebpackOutput(webpackCfg, extraCfg) {
  const { OUTPUT_ROOT, OUTPUT_PUBLIC_PATH, IS_PRODUCTION_MODE } = extraCfg;

  const filename = IS_PRODUCTION_MODE ? '[name]-[chunkhash]' : '[name]';
  const chunkFilename = IS_PRODUCTION_MODE ? '[name]-[chunkhash].chunk' : '[name].chunk';

  const { output: prevOutput = {} } = webpackCfg;
  const output = Object.assign({}, prevOutput, {
    path: OUTPUT_ROOT,
    publicPath: OUTPUT_PUBLIC_PATH,
    filename: `${filename}.js`,
    chunkFilename: `${chunkFilename}.js`
  });

  return Object.assign({}, webpackCfg, { output });
};
