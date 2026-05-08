import { createRequire } from 'node:module';
import { dirname } from 'node:path';
import type { StorybookConfig } from '@storybook/react-vite';
import remarkGfm from 'remark-gfm';
import { InlineConfig } from 'vite';

const require = createRequire(import.meta.url);

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that are set up within a monorepo.
 */
const getAbsolutePath = (input: string) => dirname(require.resolve(`${input}/package.json`));

const config: StorybookConfig = {
  stories: ['../src/**/*.docs.mdx', '../src/**/*.stories.tsx'],
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
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-mcp'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },
  features: {
    changeDetection: true,
    experimentalComponentsManifest: true,
  },
  viteFinal: async (config: InlineConfig) => {
    return {
      ...config,
      optimizeDeps: {
        include: ['@storybook/theming'],
      },
    };
  },
};
export default config;
