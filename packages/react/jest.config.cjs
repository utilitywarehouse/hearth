module.exports = {
  preset: 'ts-jest/presets/default-esm', // Use ESM preset for TypeScript
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Use the CommonJS setup file
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true, // Enable ESM support for TypeScript files
      },
    ],
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'], // Treat TypeScript files as ESM
  testPathIgnorePatterns: ['/node_modules/', '/dist/'], // Exclude dist folder
};
