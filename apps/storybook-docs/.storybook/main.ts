// This file has been automatically migrated to valid ESM format by Storybook.
import type { StorybookConfig } from '@storybook/react-vite';
import { createRequire } from 'node:module';
import remarkGfm from 'remark-gfm';

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
  stories: [
    '../docs/**/*.docs.mdx',
    '../docs/**/*.mdx',
    '../docs/**/*.stories.tsx',
    '../docs/**/*.stories.ts',
  ],
  addons: [
    getAbsolutePath('@chromatic-com/storybook'),
    {
      name: getAbsolutePath('@storybook/addon-docs'),
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },
  refs: {
    react: {
      title: 'React',
      url: isDev ? 'http://localhost:6001' : '/react',
      expanded: false,
    },
    'react-native': {
      title: 'React Native',
      url: isDev ? 'http://localhost:6002' : '/react-native',
      expanded: false,
    },
  },
};

export default config;
