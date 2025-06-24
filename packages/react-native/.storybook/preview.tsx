import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import '@utilitywarehouse/hearth-fonts';
import { color } from '@utilitywarehouse/hearth-tokens';
import { useEffect } from 'react';
import '../../../shared/storybook/styles/preview.css';
import theme from '../../../shared/storybook/theme';
import { breakpoints, StyleSheet, themes } from '../src/core';

StyleSheet.configure({
  themes,
  breakpoints,
  settings: {
    initialTheme: 'light',
    adaptiveThemes: false,
  },
});

/** @type { import('@storybook/react-native-web-vite').Preview } */
const preview = {
  beforeAll: () => {
    let canAccessParent = false;
    try {
      canAccessParent = window.parent.location.hostname === window.location.hostname;
    } catch {
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
    docs: {
      theme,
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
  decorators: [
    (Story, { args }) => {
      useEffect(() => {
        const storybookContainer = document.getElementsByTagName('body')[0];
        if (storybookContainer) {
          if (args.inverted) {
            storybookContainer.style.backgroundColor = color.purple['700'];
          } else {
            storybookContainer.style.backgroundColor = !args.darkMode
              ? color.warmWhite['50']
              : color.grey['100'];
          }
        }
      }, [args.darkMode, args.surface, args.inverted]);

      return (
        <BottomSheetModalProvider>
          <Story />
        </BottomSheetModalProvider>
      );
    },
  ],
};

export default preview;
