module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true,
  },
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', '@magnus/config/eslint.base.cjs'],
  parserOptions: {
    project: './tsconfig.json',
  },
};
