import type { Preview } from '@storybook/react';
import '@utilitywarehouse/hearth-css-reset';
import '@utilitywarehouse/hearth-fonts';
import '../../../shared/storybook/styles/preview.css';
import '@utilitywarehouse/hearth-tokens/index.css';
import '@utilitywarehouse/hearth-react/styles.css';
import theme from '../../../shared/storybook/theme';

const closeStories = (delay: number = 0) => {
  // Clsoe Stories menu if open
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
        order: ['Welcome', 'CSS Reset'],
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
