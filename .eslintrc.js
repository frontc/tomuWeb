module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'semi': 0,
    'no-tabs': 'off',
    'prefer-template': 'off',
    "arrow-parens": 0,
    "space-before-function-paren": 0,
    "eqeqeq": 0,
    'comma-dangle':0,
    'prefer-const':0,
    'linebreak-style': 0,
    'max-len': 'off',
    "no-restricted-syntax": 0,
    "prefer-destructuring": ["error", {"object": true, "array": false}],
    'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }]
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
