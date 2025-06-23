import '../src/stories/styles.css';
import '@utilitywarehouse/hearth-fonts';
import '../../../shared/storybook/styles/preview.css';
import theme from '../../../shared/storybook/theme';

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
        order: ['Introduction', 'Getting Started'],
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
