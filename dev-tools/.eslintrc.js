module.exports = {
  root: true,
  extends: '../.eslintrc.js',
  rules: {
    'no-console': 'off',
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: true
    }]
  }
};
