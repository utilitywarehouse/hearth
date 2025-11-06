// This file has been automatically migrated to valid ESM format by Storybook.
import { createRequire } from "node:module";
import type { StorybookConfig } from '@storybook/react-vite';

import { join, dirname } from 'path';

const require = createRequire(import.meta.url);

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}
const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.tsx', '../stories/**/*.stories.ts'],
  addons: [
    getAbsolutePath('@storybook/addon-onboarding'),
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath("@storybook/addon-docs")
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },
  async viteFinal(config) {
    // Add your configuration here
    config.optimizeDeps = {
      exclude: ['node_modules/.cache/sb-vite'],
    };
    return config;
  },
};
export default config;
