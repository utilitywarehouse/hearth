import { useEffect } from 'react';
import '../src/core';
import theme from '../../../shared/storybook/theme';
import { color } from '@utilitywarehouse/hearth-tokens';
import { useArgs } from 'storybook/preview-api';
import '@utilitywarehouse/hearth-fonts';
import '../../../shared/storybook/styles/preview.css';

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

      return <Story />;
    },
  ],
};

export default preview;
