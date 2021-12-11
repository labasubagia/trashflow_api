module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['prettier', 'airbnb-base'],
  plugins: ['prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'prettier/prettier': ['error', { singleQuote: true }],
    'no-unsafe-optional-chaining': 'off',
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
    'arrow-body-style': 'off',
    'object-curly-newline': 'off',
    camelcase: 'off',
  },
};
