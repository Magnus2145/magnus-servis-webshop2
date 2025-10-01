module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', '@magnus/config/eslint.base.cjs'],
  env: {
    node: true,
    es2022: true,
  },
};
