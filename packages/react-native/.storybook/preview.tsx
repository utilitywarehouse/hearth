import React, { useEffect } from 'react';
import type { Preview } from '@storybook/react';
import { useArgs } from 'storybook/internal/preview-api';
import { themes, breakpoints, StyleSheet, HearthUIProvider } from '../src/core';
import theme from '../../../shared/storybook/theme';
import { color } from '@utilitywarehouse/hearth-tokens';
import '@utilitywarehouse/hearth-fonts';
import '../../../shared/storybook/styles/preview.css';

StyleSheet.configure({
  breakpoints,
  themes: themes,
  settings: {
    initialTheme: 'light',
    adaptiveThemes: false,
  },
});

const preview: Preview = {
  beforeAll: () => {
    let canAccessParent = false;
    try {
      canAccessParent = window.parent.location.hostname === window.location.hostname;
    } catch (error) {
      // CORS error, can't access parent domain
      canAccessParent = false;
    }

    if (canAccessParent) {
      const storiesMenuItem = window.parent.document.getElementById('stories');
      const storiesMenuItemButton = storiesMenuItem?.querySelector('button');
      if (storiesMenuItemButton?.getAttribute('aria-expanded') === 'true') {
        storiesMenuItemButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      }
    }
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme,
    },
    options: {
      storySort: {
        order: [
          'Introduction',
          'Getting Started',
          'Primitives',
          'Typography',
          'Forms',
          'Components',
        ],
      },
    },
  },
  decorators: [
    Story => {
      const [args] = useArgs();

      useEffect(() => {
        const storybookContainer = document.getElementsByTagName('body')[0];
        if (storybookContainer) {
          if (args.inverted) {
            storybookContainer.style.backgroundColor = color.light.purple['700'];
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
