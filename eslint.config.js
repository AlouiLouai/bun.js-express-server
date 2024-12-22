import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  // Base JavaScript configuration
  js.configs.recommended,

  // TypeScript-specific configuration
  {
    files: ['**/*.{ts,tsx}'], // Match TypeScript files
    languageOptions: {
      parser: tsParser, // Specify the TypeScript parser with parse() method
      parserOptions: {
        tsconfigRootDir: './', // Adjust as necessary for your project
        project: './tsconfig.json', // Path to your TypeScript config file
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint, // Include the TypeScript plugin
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn', // Example TypeScript rule
    },
  },

  // Ignore specific files
  {
    ignores: ['**/node_modules/**', '**/dist/**', '**/build/**'],
  },
];
