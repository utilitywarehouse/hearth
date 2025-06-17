import type { StorybookConfig } from '@storybook/react-vite';

import { join, dirname } from 'path';

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
      url: isDev ? 'http://localhost:6003' : 'https://uw-hearth-react.vercel.app',
      expanded: false,
    },
    'react-native': {
      title: 'Hearth React Native',
      url: isDev ? 'http://localhost:6004' : 'https://uw-hearth-react-native.vercel.app',
      expanded: false,
    },
    icons: {
      title: 'Hearth Icons',
      url: isDev ? 'http://localhost:6002' : 'https://uw-hearth-icons.vercel.app',
      expanded: false,
    },
    tokens: {
      title: 'Hearth Tokens',
      url: isDev ? 'http://localhost:6005' : 'https://uw-hearth-tokens.vercel.app',
      expanded: false,
    },
    fonts: {
      title: 'Hearth Fonts',
      url: isDev ? 'http://localhost:6001' : 'https://uw-hearth-fonts.vercel.app',
      expanded: false,
    },
  },
};
export default config;
