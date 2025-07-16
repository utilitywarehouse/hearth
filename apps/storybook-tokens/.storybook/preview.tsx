import '@utilitywarehouse/hearth-fonts';
import '@utilitywarehouse/hearth-react/styles.css';
import '../../../shared/storybook/styles/preview.css';
import theme from '../../../shared/storybook/theme';
import '../src/stories/styles.css';

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
