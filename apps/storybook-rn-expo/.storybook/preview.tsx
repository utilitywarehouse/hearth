import { NativeUIProvider } from '@utilitywarehouse/hearth-react-native';
import { View } from 'react-native';

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
      <NativeUIProvider>
        <View
          style={{
            flex: 1,
            backgroundColor: parameters.noBackground === true ? undefined : '#fff',
            padding: 8,
          }}
        >
          <Story />
        </View>
      </NativeUIProvider>
    ),
  ],
};

export default preview;
