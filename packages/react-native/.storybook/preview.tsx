import React from 'react';
import type { Preview } from '@storybook/react';
import { NativeUIProvider } from '../src/core';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
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
