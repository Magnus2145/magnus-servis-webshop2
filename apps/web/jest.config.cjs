const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^@magnus/ui$': '<rootDir>/../../packages/ui/src',
    '^@magnus/ui/(.*)$': '<rootDir>/../../packages/ui/src/$1',
  },
};

module.exports = createJestConfig(customJestConfig);
