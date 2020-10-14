module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/SourceCode/$1'
  },
  collectCoverageFrom: [
    "**/*.ts",
    "!**/node_modules/**",
  ],
  globals: {
    'ts-jest': {}
  },
  roots: ['tests']
};