import js from '@eslint/js';
import importX from 'eslint-plugin-import-x';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default tseslint.config(
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '.eslintrc.js',
      '.vscode/**',
      '**/tsconfig.json',
      '**/*.md',
      '**/*.mdx',
      '**/__testfixtures__/**',
    ],
  },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      importX.flatConfigs.recommended,
      importX.flatConfigs.typescript,
      jsxA11y.flatConfigs.recommended,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: { ...globals.browser, module: 'readonly' },
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: ['./packages/*/tsconfig.json', './apps/*/tsconfig.json', './shared/tsconfig.json'],
        tsconfigRootDir: __dirname,
      },
    },
    plugins: { react, 'react-hooks': reactHooks },
    settings: { react: { version: 'detect' } },
    rules: {
      // eslint-plugin-react-hooks@7 merged the React Compiler rules into its
      // recommended config. We deliberately use only the two classic rules here
      // (rules-of-hooks + exhaustive-deps) because this codebase does not target
      // React Compiler compatibility. When the team adopts React Compiler, the
      // full recommended (or recommended-latest) config can be restored and the
      // resulting violations addressed.
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      // eslint-plugin-react: manually include only ESLint-10-compatible recommended rules.
      // The following rules from recommended crash on ESLint 10 because they use
      // Components.js / usedPropTypes.js which calls the removed context.getFilename() API:
      //   display-name, jsx-no-target-blank, no-deprecated, no-direct-mutation-state,
      //   no-render-return-value, no-string-refs, no-unknown-property, no-unsafe,
      //   require-render-return
      'react/jsx-key': 'error',
      'react/jsx-no-comment-textnodes': 'error',
      'react/jsx-no-duplicate-props': 'error',
      'react/jsx-no-undef': 'error',
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react/no-children-prop': 'error',
      'react/no-danger-with-children': 'error',
      'react/no-find-dom-node': 'error',
      'react/no-is-mounted': 'error',
      'react/no-unescaped-entities': 'error',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      // other rules
      'no-extra-boolean-cast': 'off',
      'no-cond-assign': 'error',
      'no-constant-condition': 'error',
      'no-unreachable': 'error',
      'no-unused-expressions': 'error',
      'no-constant-binary-expression': 'error',
      'no-sequences': 'error',
      '@typescript-eslint/array-type': ['error', { default: 'generic' }],
      '@typescript-eslint/unbound-method': 'off',
    },
  },
  {
    files: ['**/*.stories.tsx'],
    rules: {
      'react-hooks/rules-of-hooks': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
    },
  },
);
