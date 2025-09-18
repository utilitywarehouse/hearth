import { Preview } from '@storybook/react-vite';
import '@utilitywarehouse/hearth-css-reset';
import '@utilitywarehouse/hearth-fonts';
import '@utilitywarehouse/hearth-react/styles.css';
import '@utilitywarehouse/hearth-tokens/index.css';
import '../../../shared/storybook/styles/preview.css';
import theme from '../../../shared/storybook/theme';

const preview: Preview = {
  parameters: {
    docs: { theme },
    options: {
      storySort: {
        order: ['Introduction', 'Search Assets'],
      },
    },
  },
};

export default preview;
