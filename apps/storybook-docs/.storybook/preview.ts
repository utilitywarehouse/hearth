import type { Preview } from '@storybook/react';
import '@utilitywarehouse/hearth-css-reset';
import '@utilitywarehouse/hearth-fonts';
import theme from './theme';

const preview: Preview = {
  parameters: {
    docs: {
      theme: theme,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
