module.exports = {
  root: true,
  extends: ['next', 'next/core-web-vitals', '@magnus/config/eslint.base.cjs'],
  parserOptions: {
    project: './tsconfig.json',
  },
};
