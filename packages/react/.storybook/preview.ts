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
      height: '90dvh',
    },
  },
  tablet: {
    name: 'tablet',
    styles: {
      width: `${breakpoints.tablet}px`,
      height: '100dvh',
    },
  },
  desktop: {
    name: 'desktop',
    styles: {
      width: `${breakpoints.desktop}px`,
      height: '100dvh',
    },
  },
  wide: {
    name: 'wide',
    styles: {
      width: `${breakpoints.wide}px`,
      height: '100dvh',
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
          'Changelog',
          'Migrating from Web UI',
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
    // globally disable chromatic snapshots & accessibility tests
    // chromatic: { disableSnapshot: true },
  },
};

export default preview;
