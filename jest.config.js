module.exports = {
  preset: 'ts-jest',
  // preset: 'ts-jest/preset/js-with-ts', // Для js
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '\\.(css)': 'identity-obj-proxy'
  },
  snapshotSerializers: ['enzyme-to-json/serializer'],
}