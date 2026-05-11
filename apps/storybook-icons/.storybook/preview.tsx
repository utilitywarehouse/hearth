import { Preview } from '@storybook/react-vite';
import '@utilitywarehouse/hearth-css-reset';
import '@utilitywarehouse/hearth-fonts';
import '@utilitywarehouse/hearth-tokens/index.css';
import '@utilitywarehouse/hearth-react/styles.css';
import '../../../shared/storybook/styles/preview.css';
import { config } from '../../../shared/storybook/theme';
import { create } from 'storybook/theming';

const theme = create(config);

const preview: Preview = {
  parameters: {
    docs: {
      theme,
    },
    options: {
      storySort: {
        order: ['Introduction', 'Search Icons'],
      },
    },
  },
};

export default preview;
