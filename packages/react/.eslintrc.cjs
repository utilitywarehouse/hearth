/* eslint-env node */
module.exports = {
  extends: ['../../.eslintrc.js'],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    // Enforce named imports from React (no namespace imports)
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'react',
            importNames: ['default'],
            message: 'Import named exports from React instead of the default export.',
          },
        ],
        patterns: [
          {
            group: ['react'],
            importNamePattern: '^React$',
            message:
              'Use named imports from React instead of namespace imports (import * as React).',
          },
        ],
      },
    ],
    'react/jsx-curly-brace-presence': [
      'error',
      {
        props: 'never',
        children: 'never',
      },
    ],
    // The list role is applied intentionally to apply default styling
    'jsx-a11y/no-redundant-roles': [
      'error',
      {
        ol: ['list'],
        ul: ['list'],
      },
    ],
  },
};
