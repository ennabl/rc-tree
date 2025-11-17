module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
  ],
  rules: {
    'react/sort-comp': 0,
    'default-case': 0,
    'react-hooks/exhaustive-deps': 0,
    'no-loop-func': 0,
    'max-classes-per-file': 0,
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'react/no-unknown-property': 'off',
    'no-unused-vars': 'warn',
    'no-undef': 'off', // TypeScript handles this
    'react/react-in-jsx-scope': 'off', // Not needed in modern React
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
