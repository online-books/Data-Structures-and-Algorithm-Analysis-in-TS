module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/src/$1'
  },
  collectCoverageFrom: [
    "**/*.ts",
    "!**/node_modules/**",
  ],
  globals: {
    'ts-jest': {}
  }
};