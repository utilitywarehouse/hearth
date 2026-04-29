import { Preview } from '@storybook/react-vite';
import '@utilitywarehouse/hearth-fonts';
import '@utilitywarehouse/hearth-react/styles.css';
import { breakpoints } from '@utilitywarehouse/hearth-react';
import '../../../shared/storybook/styles/preview.css';
import theme from '../../../shared/storybook/theme';

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
  globalTypes: {
    measureEnabled: {
      name: 'Measure',
      description: 'Enable measure addon',
      defaultValue: false,
    },
    outline: {
      name: 'Outline',
      description: 'Enable outline addon',
      defaultValue: false,
    },
  },
  initialGlobals: {
    backgrounds: { value: 'primary' },
    viewport: { value: 'reset' },
  },
  parameters: {
    backgrounds: {
      options: {
        primary: { name: 'Primary', value: 'var(--h-background-primary)' },
        secondary: { name: 'Secondary', value: 'var(--h-background-secondary)' },
        brand: { name: 'Brand', value: 'var(--h-background-brand)' },
      },
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
          'Components',
          'Stories',
        ],
      },
    },

    // globally disable chromatic snapshots & accessibility tests
    chromatic: { disableSnapshot: true },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
};

export default preview;
