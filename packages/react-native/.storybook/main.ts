import type { StorybookConfig } from '@storybook/react-vite';

import { join, dirname } from 'path';
import react from '@vitejs/plugin-react';
import { flowPlugin, esbuildFlowPlugin } from '@bunchtogether/vite-plugin-flow';
import reactNativeWeb from 'vite-plugin-react-native-web';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}
const extensions = [
  '.web.tsx',
  '.tsx',
  '.web.ts',
  '.ts',
  '.web.jsx',
  '.jsx',
  '.web.js',
  '.js',
  '.css',
  '.json',
  '.mjs',
];

const development = process.env.NODE_ENV === 'development';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-react-native-web'),
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-interactions'),
    getAbsolutePath('@storybook/addon-a11y'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },
  async viteFinal(config, { configType }) {
    const { mergeConfig } = await import('vite');

    if (configType === 'DEVELOPMENT') {
      // Your development configuration goes here
    }
    if (configType === 'PRODUCTION') {
      // Your production configuration goes here.
    }
    return mergeConfig(config, {
      resolve: {
        extensions: extensions,
        alias: {
          'react-native$': 'react-native-web',
          'react-native': 'react-native-web',
          '../Utilities/Platform': 'react-native-web/dist/exports/Platform',
          '../../Utilities/Platform': 'react-native-web/dist/exports/Platform',
        },
      },
      plugins: [
        reactNativeWeb(),
        react({
          babel: {
            presets: ['@babel/preset-react'],
            plugins: [
              'react-native-unistyles/plugin',
              '@babel/plugin-proposal-export-namespace-from',
              'react-native-reanimated/plugin',
            ],
          },
        }),
      ],
    });
  },
};
export default config;
