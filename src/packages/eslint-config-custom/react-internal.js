const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/*
 * This is a custom ESLint configuration for use with
 * internal (bundled by their consumer) libraries
 * that utilize React.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

module.exports = {
  extends: [
    '@vercel/style-guide/eslint/browser',
    '@vercel/style-guide/eslint/typescript',
    '@vercel/style-guide/eslint/react'
  ].map(require.resolve),
  parserOptions: {
    project
  },
  globals: {
    JSX: true
  },
  settings: {
    'import/resolver': {
      typescript: {
        project
      }
    }
  },
  ignorePatterns: ['node_modules/', 'dist/', '.eslintrc.js'],

  rules: {
    '@typescript-eslint/consistent-type-definitions': 'off',
    'react/function-component-definition': 'off',
    'import/no-default-export': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react/button-has-type': 'off',
    "@typescript-eslint/array-type": "off",
    "react-hooks/exhaustive-deps": "off",
    "react-hooks/rules-of-hooks": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "unicorn/filename-case": "off",
    "@typescript-eslint/no-unnecessary-type-assertion": "off",
    "react/jsx-sort-props": "off",
  }
};
