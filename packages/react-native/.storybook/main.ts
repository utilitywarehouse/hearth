import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import remarkGfm from 'remark-gfm';
import svgr from 'vite-plugin-svgr';

const unistylesPluginOptions = {
  autoProcessImports: ['@utilitywarehouse/hearth-react-native'],
  autoProcessPaths: ['@utilitywarehouse/hearth-react-native'],
  root: './src',
  debug: false,
};

/** @type { import('@storybook/react-native-web-vite').StorybookConfig } */
const config = {
  stories: ['../**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
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
    getAbsolutePath('@storybook/addon-vitest'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-native-web-vite'),
    options: {
      pluginReactOptions: {
        babel: {
          plugins: [
            ['react-native-unistyles/plugin', unistylesPluginOptions],
            '@babel/plugin-proposal-export-namespace-from',
            'react-native-worklets/plugin',
          ],
        },
      },
    },
  },
  viteFinal: async (config: any) => {
    // Add SVGR plugin for web SVG imports as React components
    config.plugins = [
      ...(config.plugins || []),
      svgr({
        include: '**/*.svg',
        svgrOptions: {
          exportType: 'default',
          ref: true,
          svgo: false,
          titleProp: true,
          icon: true,
        },
      }),
    ];

    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          '@utilitywarehouse/hearth-react-native-icons': '@utilitywarehouse/hearth-react-icons',
        },
      },
      optimizeDeps: {
        ...config.optimizeDeps,
        exclude: [...(config.optimizeDeps?.exclude || []), '@utilitywarehouse/hearth-svg-assets'],
      },
    };
  },
};
export default config;

function getAbsolutePath(value: string): any {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
