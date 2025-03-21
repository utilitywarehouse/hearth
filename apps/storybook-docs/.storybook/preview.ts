import type { Preview } from '@storybook/react';
import '@utilitywarehouse/hearth-css-reset';
import '@utilitywarehouse/hearth-fonts';
import '../../../shared/storybook/styles/preview.css';
import '@utilitywarehouse/hearth-tokens/index.css';
import '@utilitywarehouse/hearth-react/styles.css';
import theme from '../../../shared/storybook/theme';

const preview: Preview = {
  parameters: {
    docs: {
      theme,
    },
    options: {
      storySort: {
        order: ['Welcome', 'CSS Reset'],
      },
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
