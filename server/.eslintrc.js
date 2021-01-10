module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier/@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'linebreak-style': 0,
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
  },
};
