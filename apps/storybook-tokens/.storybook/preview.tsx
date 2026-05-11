import '@utilitywarehouse/hearth-fonts';
import '@utilitywarehouse/hearth-react/styles.css';
import '../../../shared/storybook/styles/preview.css';
import '../src/stories/styles.css';
import { config } from '../../../shared/storybook/theme';
import { create } from 'storybook/theming';

const theme = create(config);

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  decorators: [
    Story => (
      <div style={{ margin: '3em' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      theme,
    },
    options: {
      storySort: {
        order: [
          'Introduction',
          'Getting Started',
          'Border (Radius & Width)',
          'Colours',
          '- All Colours',
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
