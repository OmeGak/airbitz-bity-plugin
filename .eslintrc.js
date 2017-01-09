module.exports = {
  root: true,
  extends: 'airbnb',
  env: {
    browser: true,
    jasmine: true,
    node: true
  },
  plugins: [
    'react'
  ],
  rules: {
    'comma-dangle': ['error', 'never'],
    'no-param-reassign': 'off',
    'no-use-before-define': ['error', 'nofunc'],
    'no-plusplus': 'off',
    'func-names': 'off',
    'default-case': 'off',
    'no-shadow': 'off',
    'vars-on-top': 'off',
    'max-len': ['error', 120],
    'import/imports-first': 'off',
    'import/prefer-default-export': 'off'
  }
};
