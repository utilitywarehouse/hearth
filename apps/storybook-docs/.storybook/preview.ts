import type { Preview } from '@storybook/react-vite';
import '@utilitywarehouse/hearth-fonts';
import '@utilitywarehouse/hearth-react/styles.css';
import '@utilitywarehouse/hearth-storybook-utils/styles/preview.css';
import { config } from '@utilitywarehouse/hearth-storybook-utils';
import { create } from 'storybook/theming';

const theme = create(config);

const closeStories = (delay: number = 0) => {
  // Close Stories menu if open
  setTimeout(() => {
    const reactNativeStoriesMenuItem =
      window.parent.document.getElementById('react-native_stories');
    const reactNativeStoriesMenuItemButton = reactNativeStoriesMenuItem?.querySelector('button');
    if (reactNativeStoriesMenuItemButton?.getAttribute('aria-expanded') === 'true') {
      reactNativeStoriesMenuItemButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    }
    const reactStoriesMenuItem = window.parent.document.getElementById('react_stories');
    const reactStoriesMenuItemButton = reactStoriesMenuItem?.querySelector('button');
    if (reactStoriesMenuItemButton?.getAttribute('aria-expanded') === 'true') {
      reactStoriesMenuItemButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    }
  }, delay);
};

const preview: Preview = {
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
  initialGlobals: {
    darkMode: false,
  },
  beforeAll: () => {
    closeStories();
    // get all elements by data-action='collapse-ref'
    const elements = window.parent.document.querySelectorAll('[data-action="collapse-ref"]');
    elements.forEach(element => {
      element.addEventListener('click', () => closeStories(100));
    });
  },
  parameters: {
    docs: {
      theme,
    },
    options: {
      storySort: {
        order: [
          'Welcome',
          'Hearth CSS Reset',
          'Hearth Fonts',
          ['Introduction', 'Getting Started', 'CDN Usage', 'Comic Hams', 'DM Sans', 'DM Mono'],
          'Hearth Tokens',
          [
            'Introduction',
            'Getting Started',
            'Browser and CSS Tokens',
            'JS Tokens',
            'Primitive Color',
            'Semantic',
            'Space',
            'Layout',
            'Typography',
            'Border',
            'Shadow',
            'Component',
          ],
          'Hearth Icons',
          [
            'Introduction',
            'Search Icons',
            'React Icons',
            'SVG Icons',
            'React Native Icons',
            'All Icons',
            'Individual Icons',
          ],
        ],
      },
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
