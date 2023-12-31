const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/*
 * This is a custom ESLint configuration for use with
 * Next.js apps.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

module.exports = {
  extends: [
    '@vercel/style-guide/eslint/node',
    '@vercel/style-guide/eslint/browser',
    '@vercel/style-guide/eslint/typescript',
    '@vercel/style-guide/eslint/react',
    '@vercel/style-guide/eslint/next',
    'eslint-config-turbo'
  ].map(require.resolve),
  parserOptions: {
    project
  },
  globals: {
    React: true,
    JSX: true
  },
  settings: {
    'import/resolver': {
      typescript: {
        project
      }
    }
  },
  ignorePatterns: ['node_modules/', 'dist/'],
  // add rules configurations here
  rules: {
    '@typescript-eslint/consistent-type-definitions': 'off',
    'react/function-component-definition': 'off',
    'import/no-default-export': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react/button-has-type': 'off',
    "react-hooks/exhaustive-deps": "off",
    "react-hooks/rules-of-hooks": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/array-type": "off",
    "unicorn/filename-case": "off",
    "@typescript-eslint/no-unnecessary-type-assertion": "off",
    "react/jsx-sort-props": "off",
    "@typescript-eslint/unbound-method": "off",
    "import/no-cycle": "off",
    "no-bitwise": "off",
    "@typescript-eslint/no-unnecessary-condition": "off",
    "no-constant-condition": "off",
    "no-param-reassign": "off",
    "camelcase": "off",
    "@typescript-eslint/no-shadow": "off",
    "no-useless-return": "off",
  }
};
