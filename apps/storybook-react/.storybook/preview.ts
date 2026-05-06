import { Preview } from '@storybook/react-vite';
import theme from '../../../shared/storybook/theme';
import '@utilitywarehouse/hearth-fonts';
import '@utilitywarehouse/hearth-react/styles.css';
import { breakpoints } from '@utilitywarehouse/hearth-react';
import '../../../shared/storybook/styles/preview.css';

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
    viewport: { value: 'reset' },
  },
  parameters: {
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
  },
};

export default preview;
