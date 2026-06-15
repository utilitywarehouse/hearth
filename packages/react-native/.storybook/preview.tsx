import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import '@utilitywarehouse/hearth-fonts';
import { color } from '@utilitywarehouse/hearth-tokens';
import '@utilitywarehouse/hearth-tokens/index.css';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '@utilitywarehouse/hearth-storybook-utils/styles/diff-highlighting.css';
import '@utilitywarehouse/hearth-storybook-utils/styles/preview.css';
import { breakpoints, StyleSheet, themes, UnistylesRuntime } from '../src/core';
import { initializePrism } from './prism-setup';
import { config } from '@utilitywarehouse/hearth-storybook-utils';
import { create } from 'storybook/theming';

const theme = create(config);

// Initialize Prism.js for syntax highlighting
initializePrism();

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
  globalTypes: {
    darkMode: {
      description: 'Toggle between light and dark mode',
      defaultValue: false,
      toolbar: {
        title: 'Dark Mode',
        icon: 'moon',
        items: [
          { value: false, icon: 'sun', title: 'Light mode' },
          { value: true, icon: 'moon', title: 'Dark mode' },
        ],
        dynamicTitle: true,
      },
    },
  },
  beforeAll: () => {
    if (!__DEV__) {
      let canAccessParent = false;
      try {
        canAccessParent = window.parent.location.hostname === window.location.hostname;
      } catch {
        // CORS error, can't access parent domain — canAccessParent stays false
      }

      if (canAccessParent) {
        const storiesMenuItem = window.parent.document.getElementById('stories');
        const storiesMenuItemButton = storiesMenuItem?.querySelector('button');
        if (storiesMenuItemButton?.getAttribute('aria-expanded') === 'true') {
          storiesMenuItemButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        }
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
          'Changelog',
          'Styling',
          'Theme Tokens',
          'Hooks',
          'Layout Components',
          'Guides',
          'All Components',
          'Primitives',
          'Typography',
          'Forms',
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
    (Story, { args, globals }) => {
      const isDarkMode = globals.darkMode;

      useEffect(() => {
        const storybookContainer = document.getElementsByTagName('body')[0];
        if (storybookContainer) {
          if (args.inverted) {
            storybookContainer.style.backgroundColor = color.purple['700'];
          } else {
            storybookContainer.style.backgroundColor = isDarkMode
              ? color.dark.background.primary
              : color.light.background.primary;
          }
        }

        let canAccessParent = false;
        try {
          canAccessParent = window.parent.location.hostname === window.location.hostname;
        } catch {
          // CORS error, can't access parent domain — canAccessParent stays false
        }

        if (canAccessParent) {
          // Update the Storybook theme class for manager UI
          const managerRoot = window.parent?.document?.documentElement;
          if (managerRoot) {
            if (isDarkMode) {
              managerRoot.classList.add('dark');
              managerRoot.setAttribute('data-theme', 'dark');
            } else {
              managerRoot.classList.remove('dark');
              managerRoot.setAttribute('data-theme', 'light');
            }
            if (args.inverted) {
              managerRoot.classList.add('inverted');
              managerRoot.setAttribute('data-inverted', 'true');
            } else {
              managerRoot.classList.remove('inverted');
              managerRoot.removeAttribute('data-inverted');
            }
          }
        }
        // Update the preview iframe theme
        const previewRoot = document.documentElement;
        if (previewRoot) {
          if (isDarkMode) {
            previewRoot.classList.add('dark');
            previewRoot.setAttribute('data-theme', 'dark');
          } else {
            previewRoot.classList.remove('dark');
            previewRoot.setAttribute('data-theme', 'light');
          }
          if (args.inverted) {
            previewRoot.classList.add('inverted');
            previewRoot.setAttribute('data-inverted', 'true');
          } else {
            previewRoot.classList.remove('inverted');
            previewRoot.removeAttribute('data-inverted');
          }
        }

        UnistylesRuntime.setTheme(isDarkMode ? 'dark' : 'light');
      }, [isDarkMode, args.darkMode, args.surface, args.inverted]);

      return (
        <SafeAreaProvider>
          <BottomSheetModalProvider>
            <Story args={{ ...args, darkMode: isDarkMode }} />
          </BottomSheetModalProvider>
        </SafeAreaProvider>
      );
    },
  ],
};

export default preview;
