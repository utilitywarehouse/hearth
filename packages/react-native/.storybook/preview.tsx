import React, { useEffect } from 'react';
import type { Preview } from '@storybook/react';
import { useArgs } from 'storybook/internal/preview-api';
import { themes, breakpoints, StyleSheet, HearthUIProvider } from '../src/core';
import '@utilitywarehouse/hearth-fonts';
import '../../../shared/storybook/styles/preview.css';

import { color } from '@utilitywarehouse/hearth-tokens';
import theme from '../../../shared/storybook/theme';

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
    options: {
      storySort: {
        order: ['Primitives', 'Typography', 'Forms', 'Components'],
      },
    },
  },
  decorators: [
    Story => {
      const [args, setArgs] = useArgs();

      useEffect(() => {
        const storybookContainer = document.getElementsByTagName('body')[0];
        if (storybookContainer) {
          if (args.inverted) {
            storybookContainer.style.backgroundColor = color.light.purple['300'];
          } else {
            storybookContainer.style.backgroundColor = !args.darkMode
              ? color.light.warmWhite['50']
              : color.dark.grey[900];
          }
        }
      }, [args.darkMode, args.surface, args.inverted]);

      return (
        <HearthUIProvider>
          <Story />
        </HearthUIProvider>
      );
    },
  ],
};

export default preview;
