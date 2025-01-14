import React from 'react';
import type { Preview } from '@storybook/react';
import { NativeUIProvider } from '../src/core';
import theme from './theme';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme: theme,
    },
  },
  decorators: [
    Story => {
      return (
        <NativeUIProvider>
          <Story />
        </NativeUIProvider>
      );
    },
  ],
};

export default preview;
