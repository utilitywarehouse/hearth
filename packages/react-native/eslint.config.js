// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook';

import { fixupPluginRules } from '@eslint/compat';
import js from '@eslint/js';
import reactNativeA11y from 'eslint-plugin-react-native-a11y';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['build', 'dist', 'storybook-static', '**/*.figma.tsx', '**/*.figma.ts'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: './tsconfig.eslint.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      // Written for ESLint <=8; fixupPluginRules shims the legacy rule context.
      'react-native-a11y': fixupPluginRules(reactNativeA11y),
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/no-explicit-any': 'off',
      // Static RN accessibility checks. Rules for deprecated props (accessibilityTraits,
      // accessibilityStates, accessibilityComponentType) are left out.
      'react-native-a11y/has-valid-accessibility-actions': 'error',
      'react-native-a11y/has-valid-accessibility-live-region': 'error',
      'react-native-a11y/has-valid-accessibility-role': 'error',
      'react-native-a11y/has-valid-important-for-accessibility': 'error',
      'react-native-a11y/no-nested-touchables': 'error',
      // Existing hits in components; warn until they're fixed, then move to 'error'.
      'react-native-a11y/has-valid-accessibility-descriptors': 'warn',
      'react-native-a11y/has-valid-accessibility-ignores-invert-colors': 'warn',
      'react-native-a11y/has-valid-accessibility-value': 'warn',
      // Hints are optional; this flags every label without one.
      'react-native-a11y/has-accessibility-hint': 'off',
      // Crashes on spreads inside accessibilityState={{ ...x }} (reads `.value` of a
      // SpreadElement); the weekly native `toggle-has-state` check covers state instead.
      'react-native-a11y/has-valid-accessibility-state': 'off',
    },
  },
  storybook.configs['flat/recommended']
);
