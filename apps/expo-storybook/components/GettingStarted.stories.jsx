import { Linking, Text, View } from 'react-native';
import { Button } from '@utilitywarehouse/ds-react-native';

const StarterComponent = () => (
  <View style={{ padding: 16 }}>
    <Text>
      Thanks for trying out Storybook, follow the{' '}
      <Text
        style={{
          color: 'blue',
          textDecorationLine: 'underline',
          textDecorationColor: 'blue',
        }}
        onPress={() =>
          Linking.openURL(
            'https://storybook.js.org/tutorials/intro-to-storybook/react-native/en/get-started/'
          )
        }
      >
        tutorial
      </Text>{' '}
      to learn how to create your own stories
    </Text>
    <Button onPress={() => alert('yeah')}>Test</Button>
  </View>
);

const meta = {
  title: 'Welcome',
  component: StarterComponent,
};

export default meta;

export const GettingStarted = {
  args: {},
  parameters: {
    noBackground: true,
  },
};
