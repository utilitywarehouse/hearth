import rootConfig from '../../eslint.config.js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['**/*.figma.tsx'] },
  ...rootConfig,
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
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
  },
);
