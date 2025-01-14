import { NativeUIProvider } from '@utilitywarehouse/ds-react-native';
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
            backgroundColor: parameters.noBackground === true ? undefined : '#26c6da',
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
