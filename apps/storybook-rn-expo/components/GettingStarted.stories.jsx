import { Linking, Text, View } from 'react-native';
import {
  Button,
  Badge,
  StyleSheet,
  useTheme,
  UnistylesRuntime,
} from '@utilitywarehouse/hearth-react-native';
import { useEffect } from 'react';
import { theme } from '@storybook/react-native';

const StarterComponent = () => {
  return (
    <View style={styles.thing}>
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
      <Badge size="small" borderless>
        New
      </Badge>
      <Button onPress={() => alert('yeah')}>Test</Button>
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  thing: {
    backgroundColor: theme.colors.red300,
  },
}));

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
