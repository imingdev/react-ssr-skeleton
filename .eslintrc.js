// https://eslint.org/docs/user-guide/configuring
module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true
  },
  extends: [
    'airbnb'
  ],
  rules: {
    'import/no-unresolved': 'off',
    'comma-dangle': ['error', 'never'],
    'react/prop-types': 0,
    'react/jsx-props-no-spreading': 'off',
    'jsx-a11y/html-has-lang': 'off'
  }
};
