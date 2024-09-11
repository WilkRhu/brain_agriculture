import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

export default {
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
  testMatch: ['**/?(*.)+(spec|test).ts'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: [
    '**/*.(t|j)s',
    '!**/node_modules/**',
    '!**/dist/**',
    '!**/*.d.ts',
    '!**/*.config.ts',
    '!**/*.eslintrc.js',
    '!**/*.dto.ts',
    '!**/*coverage/**',
    '!**/*prettify.js',
    '!**/*sorter.js',
  ],
  coverageDirectory: '<rootDir>/coverage',
  testEnvironment: 'node',
};
