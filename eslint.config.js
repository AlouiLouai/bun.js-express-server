import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.FlatConfig} */
export default [
  // JavaScript and TypeScript files
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      globals: globals.browser, // Define browser globals
    },
    plugins: ['prettier'], // Add Prettier plugin
    ...pluginJs.configs.recommended, // Apply eslint-plugin-js recommended config
    ...tseslint.configs.recommended, // Apply typescript-eslint recommended config
    extends: ['plugin:prettier/recommended'], // Add Prettier's recommended config
    rules: {
      'prettier/prettier': 'error', // Enable Prettier errors as ESLint errors
    },
  },
  // Additional overrides for TypeScript and JavaScript files
  {
    files: ['**/*.ts', '**/*.js'],
    extends: ['plugin:prettier/recommended'], // Add Prettier's recommended config
    plugins: ['prettier'],
    rules: {
      'prettier/prettier': 'error', // Enable Prettier errors as ESLint errors
    },
    ignorePatterns: ['node_modules/', 'build/', 'dist/'],
  },
];
