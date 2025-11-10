// This file has been automatically migrated to valid ESM format by Storybook.
import { createRequire } from "node:module";
import type { StorybookConfig } from '@storybook/react-vite';

import { dirname, join } from 'path';

const require = createRequire(import.meta.url);

const isDev = process.env.NODE_ENV === 'development';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string) {
  return dirname(require.resolve(join(value, 'package.json')));
}
const config: StorybookConfig = {
  stories: ['../docs/**/*.docs.mdx'],
  addons: [getAbsolutePath('@chromatic-com/storybook'), getAbsolutePath('@storybook/addon-docs')],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },
  refs: {
    react: {
      title: 'Hearth React',
      url: isDev ? 'http://localhost:6003' : '/react',
      expanded: false,
    },
    'react-native': {
      title: 'Hearth React Native',
      url: isDev ? 'http://localhost:6004' : '/react-native',
      expanded: false,
    },
    icons: {
      title: 'Hearth Icons',
      url: isDev ? 'http://localhost:6002' : '/icons',
      expanded: false,
    },
    assets: {
      title: 'Hearth Assets',
      url: isDev ? 'http://localhost:6007' : '/assets',
      expanded: false,
    },
    tokens: {
      title: 'Hearth Tokens',
      url: isDev ? 'http://localhost:6005' : '/tokens',
      expanded: false,
    },
    fonts: {
      title: 'Hearth Fonts',
      url: isDev ? 'http://localhost:6001' : '/fonts',
      expanded: false,
    },
  },
};
export default config;
