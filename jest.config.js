module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/internals/testing/enzyme-setup.js', 'jest-enzyme'],
  testEnvironment: 'enzyme',
  testEnvironmentOptions: {
    enzymeAdapter: 'react16',
  },
  transformIgnorePatterns: ['node_modules/(?!(react-native|my-project|react-native-button)/)'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    'node_modules/(?!react-native|native-base-shoutem-theme|@shoutem/animation|@shoutem/ui|tcomb-form-native|react-navigation-stack|react-navigation)',
    '<rootDir>/app/internals/',
    '<rootDir>/app/utils/',
  ],
  setupFiles: [
    './node_modules/react-native-gesture-handler/jestSetup.js',
    '<rootDir>/internals/testing/async-storage-setup.js',
  ],
  collectCoverageFrom: [
    'app/**/*.{js,jsx}',
    '!app/**/*.test.{js,jsx}',
    '!app/*/RbGenerated*/*.{js,jsx}',
    '!app/app.js',
  ],
  coverageThreshold: {
    global: {
      statements: 98,
      branches: 91,
      functions: 98,
      lines: 98,
    },
  },
  moduleDirectories: ['node_modules', 'app'],
  testRegex: 'tests/.*\\.test\\.js$',
};
