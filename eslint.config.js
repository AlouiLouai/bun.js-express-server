import js from '@eslint/js';

export default [
  // Applying the ESLint plugin for JS files
  js.configs.recommended,

  // Optionally, you can add a custom config for tests if you need special rules for test files
  {
    files: ['**/*.test.js'], // Apply this configuration only to test files
  },

  // Additional custom config for TypeScript, if necessary
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      globals: { browser: true }, // Define browser globals
    },
    rules: {
      semi: ['warn', 'always'],
    },
  },

  // Custom Prettier integration and rules
  {
    files: ['**/*.ts', '**/*.js'],
    extends: ['plugin:prettier/recommended'],
    plugins: ['prettier'],
    rules: {
      'prettier/prettier': 'error', // Enable Prettier errors as ESLint errors
    },
  },

  // Ignore specific files
  {
    ignores: ['**/node_modules/', '**/build/', '**/dist/'],
  },
];
