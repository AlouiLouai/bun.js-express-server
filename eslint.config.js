import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config} */
export default {
  overrides: [
    {
      files: ['**/*.{js,mjs,cjs,ts}'],
      languageOptions: {
        globals: globals.browser, // Define browser globals
      },
      ...pluginJs.configs.recommended, // Apply eslint-plugin-js recommended config
      ...tseslint.configs.recommended, // Apply typescript-eslint recommended config
    },
    {
      files: ['**/*.ts', '**/*.js'],
      extends: ['plugin:prettier/recommended'], // Add Prettier's recommended config
      plugins: ['prettier'],
      rules: {
        'prettier/prettier': 'error', // Enable Prettier errors as ESLint errors
      },
    },
  ],
  ignorePatterns: ['node_modules/', 'build/', 'dist/'],
};
