import { Preview } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import '@utilitywarehouse/hearth-css-reset';
import '@utilitywarehouse/hearth-fonts';
import '@utilitywarehouse/hearth-tokens/index.css';
import '@utilitywarehouse/hearth-react/styles.css';
import '../src/storybook-components/styles.css';
import { breakpoints } from '@utilitywarehouse/hearth-react';
import '../../../shared/storybook/styles/preview.css';
import theme from '../../../shared/storybook/theme';

const customViewports = {
  mobile: {
    name: 'mobile',
    styles: {
      width: `${breakpoints.tablet / 2}px`,
      height: '100vh',
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
  ...INITIAL_VIEWPORTS,
};

const preview: Preview = {
  parameters: {
    viewport: {
      viewports: customViewports,
    },
    docs: {
      theme,
    },
    options: {
      storySort: {
        order: [
          'Primitives',
          ['Overview', 'Box', 'Flex', 'Grid'],
          'Typography',
          'Components',
          'Utilities',
          'Stories',
        ],
      },
    },
  },
};

export default preview;
