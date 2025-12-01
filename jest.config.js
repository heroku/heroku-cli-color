module.exports = {
  setupFilesAfterEnv: [
    '<rootDir>/src/__test__/init.ts',
  ],
  moduleFileExtensions: [
    'js',
    'ts',
  ],
  testMatch: [
    '**/*.test.ts',
  ],
  preset: 'ts-jest',
}
