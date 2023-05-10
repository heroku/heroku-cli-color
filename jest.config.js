module.exports = {
  setupFilesAfterEnv: ["<rootDir>/src/__test__/init.ts"],
  moduleFileExtensions: ['ts', 'js'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
}
