module.exports = {
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts(x)?',
    '!src/**/stories.tsx',
    '!src/**/styles.ts',
    '!src/types/*',
    '!src/styles/*',
    '!src/services/*',
    '!src/index.tsx'
  ],
  setupFilesAfterEnv: ['<rootDir>/.jest/setup.ts'],
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest'
  }
}
