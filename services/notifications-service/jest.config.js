module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['src/**/*.(t|j)s'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@civic-pulse/contracts$': '<rootDir>/../../packages/contracts/src',
    '^@civic-pulse/nest-common$': '<rootDir>/../../packages/nest-common/src',
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
};
