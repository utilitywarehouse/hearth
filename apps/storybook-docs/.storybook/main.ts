import type { StorybookConfig } from '@storybook/react-vite';

import { join, dirname } from 'path';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string) {
  return dirname(require.resolve(join(value, 'package.json')));
}
const config: StorybookConfig = {
  stories: ['../docs/**/*.docs.mdx'],
  addons: [
    getAbsolutePath('@storybook/addon-onboarding'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-interactions'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },
  refs: {
    react: {
      title: 'Hearth React',
      url: 'https://uw-hearth-react.vercel.app',
      expanded: false,
    },
    fonts: {
      title: 'Hearth Fonts',
      url: 'https://uw-hearth-fonts.vercel.app',
      expanded: false,
    },
  },
};
export default config;
