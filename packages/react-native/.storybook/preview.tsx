import React from 'react';
import type { Preview } from '@storybook/react';
import { NativeUIProvider } from '../src/core';
import { convert, ThemeProvider, themes } from 'storybook/internal/theming';

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
        <ThemeProvider theme={convert(themes.light)}>
          <NativeUIProvider>
            <Story />
          </NativeUIProvider>
        </ThemeProvider>
      );
    },
  ],
};

export default preview;
