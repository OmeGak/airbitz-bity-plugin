const path = require('path');

const NODE_ENV = module.exports.NODE_ENV = process.env.NODE_ENV || 'development';
module.exports.IS_DEV_MODE = NODE_ENV === 'development';
module.exports.IS_TEST_MODE = NODE_ENV === 'test';
module.exports.IS_PRODUCTION_MODE = NODE_ENV === 'production';

const PROJECT_ROOT = module.exports.PROJECT_ROOT = path.dirname(__dirname);

module.exports.SRC_ROOT = path.resolve(PROJECT_ROOT, 'src');

module.exports.OUTPUT_ROOT = path.resolve(PROJECT_ROOT, 'dist');

module.exports.OUTPUT_PUBLIC_PATH = '/';
