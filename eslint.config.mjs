import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
// Import Prettier's ESLint plugin recommended configuration
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

/** @type {import('eslint').Linter.Config[]} */
export default [
  // Match files with extensions .js, .mjs, .cjs, .ts
  { files: ['**/*.{js,mjs,cjs,ts}'] },

  // Define browser globals
  { languageOptions: { globals: globals.browser } },

  {
    rules: {
      // Turn off the strict equality (===) check
      eqeqeq: 'off',

      // Error for unused variables
      'no-unused-vars': 'error',
      'no-unused-expression': 'error',
      'no-console': 'warn',
      'no-undef': 'error',

      // Prefer const over let, except for variables used before assignment
      'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
    },

    globals: {
      process: 'readonly',
    },
  },

  // JavaScript recommended configuration
  pluginJs.configs.recommended,

  // TypeScript recommended configuration
  ...tseslint.configs.recommended,

  // Add Prettier plugin configuration
  eslintPluginPrettierRecommended,
];
