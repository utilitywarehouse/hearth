import type { Preview } from '@storybook/react';
import * as React from 'react';
import '../src/stories/styles.css';
import '@utilitywarehouse/hearth-fonts';

const preview: Preview = {
  decorators: [
    Story => (
      <div style={{ margin: '3em' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
