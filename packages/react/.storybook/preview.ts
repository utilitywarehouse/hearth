import type { Preview } from '@storybook/react-vite';
import '@utilitywarehouse/hearth-fonts';
import '@utilitywarehouse/hearth-react/styles.css';
import { breakpoints } from '@utilitywarehouse/hearth-react';
import '@utilitywarehouse/hearth-storybook-utils/styles/preview.css';
import { config } from '@utilitywarehouse/hearth-storybook-utils';
import { create } from 'storybook/theming';

const theme = create(config);

const HEARTH_VIEWPORTS = {
  mobile: {
    name: 'mobile',
    styles: {
      width: `${breakpoints.tablet / 2}px`,
      height: '90vh',
    },
  },
  tablet: {
    name: 'tablet',
    styles: {
      width: `${breakpoints.tablet}px`,
      height: '100vh',
    },
  },
  desktop: {
    name: 'desktop',
    styles: {
      width: `${breakpoints.desktop}px`,
      height: '100vh',
    },
  },
  wide: {
    name: 'wide',
    styles: {
      width: `${breakpoints.wide}px`,
      height: '100vh',
    },
  },
};

const preview: Preview = {
  parameters: {
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
    chromatic: {
      // Snapshotting is disabled by default to limit Chromatic usage — opt
      // individual stories back in (e.g. a component's KitchenSink story)
      // with `chromatic: { disableSnapshot: false }`.
      // (parameters: { chromatic: { disableSnapshot: false }, }, on a story-by-story basis)
      disableSnapshot: true,
    },
    viewport: {
      options: HEARTH_VIEWPORTS,
    },
    docs: {
      theme,
    },
    options: {
      storySort: {
        order: [
          'Getting Started',
          'Design Tokens',
          'AI Tools',
          'Changelog',
          'Migration',
          ['v0', 'v1'],
          'Common Props',
          'Responsive Design',
          ['Breakpoints', 'Responsive Props', 'Media Queries'],
          'Layout',
          ['Overview'],
          'Typography',
          ['Overview'],
          'Components',
          'Stories',
        ],
      },
    },
  },
};

export default preview;
