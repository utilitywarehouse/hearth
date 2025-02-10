import React from 'react';
import type { Preview } from '@storybook/react';
import { themes, breakpoints, StyleSheet } from '../src/core';
import '@utilitywarehouse/hearth-fonts';

import theme from './theme';

StyleSheet.configure({
  breakpoints,
  themes: themes,
  settings: {
    initialTheme: 'light',
    adaptiveThemes: false,
  },
});

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
      return <Story />;
    },
  ],
};

export default preview;
