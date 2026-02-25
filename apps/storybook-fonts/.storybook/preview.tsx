import type { Preview } from '@storybook/react-vite';
import * as React from 'react';
import '../src/stories/styles.css';
import '@utilitywarehouse/hearth-fonts';
import '@utilitywarehouse/hearth-tokens/index.css';
import '../../../shared/storybook/styles/preview.css';
import theme from '../../../shared/storybook/theme';

const preview: Preview = {
  decorators: [
    Story => (
      <div style={{ margin: '3em' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      theme,
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
