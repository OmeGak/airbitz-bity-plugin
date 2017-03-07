module.exports = {
  root: true,
  parser: 'babel-eslint',
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
    'import/prefer-default-export': 'off',
    'import/no-unresolved': ['error', {
      ignore: [
        'airbitzPluginApi'
      ]
    }],

    'react/jsx-filename-extension': 'off',
    'jsx-a11y/img-has-alt': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'react/jsx-first-prop-new-line': 'off',
    'react/jsx-closing-bracket-location': 'off'
  }
};
