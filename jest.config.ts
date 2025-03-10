import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest', // Transform TypeScript files using ts-jest
    },
    testPathIgnorePatterns: ['/node_modules/', '<rootDir>/dist/'], // Ignore test paths
    collectCoverage: true, // Enable coverage collection
    coverageDirectory: 'coverage', // Directory for coverage reports
    coverageReporters: ['text', 'lcov'], // Coverage report formats
};

export default config;
