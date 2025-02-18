import { ScrollView, View } from 'react-native';

/** @type{import("@storybook/react").Preview} */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },

  decorators: [
    (Story, { parameters }) => (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: parameters.noBackground === true ? undefined : '#fff',
        }}
        contentContainerStyle={{ padding: 8 }}
      >
        <Story />
      </ScrollView>
    ),
  ],
};

export default preview;
