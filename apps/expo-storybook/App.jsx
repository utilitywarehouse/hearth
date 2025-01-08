import { LogBox, StyleSheet, Text, View } from 'react-native';
import { NativeUIProvider, Button } from '@utilitywarehouse/ds-react-native';
import Constants from 'expo-constants';
LogBox.ignoreAllLogs();

function App() {
  return (
    <NativeUIProvider>
      <Button onPress={() => alert('yeah')}>Test</Button>
      <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app!</Text>
      </View>
    </NativeUIProvider>
  );
}

let AppEntryPoint = App;

if (Constants.expoConfig.extra.storybookEnabled === 'true') {
  AppEntryPoint = require('./.storybook').default;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AppEntryPoint;
