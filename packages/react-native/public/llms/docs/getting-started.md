# Getting Started

You can just start using the components from the `@utilitywarehouse/hearth-react-native` package.
Although there are a few components that require a `BottomSheetModalProvider` to be wrapped around your app.
You should also make sure you're app is wrapped in a `GestureHandlerRootView` from `react-native-gesture-handler`.

```tsx
// Example usage
import {
  Box,
  Alert,
  BodyText,
  BottomSheetModalProvider,
} from '@utilitywarehouse/hearth-react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App: React.FC = () => (
  <GestureHandlerRootView>
    <BottomSheetModalProvider>
      <Box p="200">
        <Alert colorScheme="positive" text="Welcome to Hearth React Native!" />
        <BodyText>Start building your app with Hearth React Native components.</BodyText>
      </Box>
    </BottomSheetModalProvider>
  </GestureHandlerRootView>
);
```

### Dark Mode

By default the light colour mode is enabled. If you want to enable dark mode, you can
use the `useColorMode` hook to toggle between light and dark modes.

```tsx
// Example usage
import {
  useColorMode,
  Box,
  Alert,
  BodyText,
  Button,
  BottomSheetModalProvider,
} from '@utilitywarehouse/hearth-react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App: React.FC = () => {
  const [colorMode, setColorMode] = useColorMode();

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <Box p="200">
          <Alert colorScheme="positive" text="Welcome to Hearth React Native!" />
          <BodyText>Start building your app with Hearth React Native components.</BodyText>
          <Button onPress={() => setColorMode(colorMode === 'light' ? 'dark' : 'light')}>
            Toggle Color Mode
          </Button>
        </Box>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};
```
