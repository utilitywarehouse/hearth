import { LogBox } from 'react-native';
import { useFonts } from 'expo-font';
import StorybookUIRoot from './.storybook';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { UnistylesRuntime } from 'react-native-unistyles';
import { useEffect } from 'react';

LogBox.ignoreAllLogs();

const App = () => {
  const [loaded] = useFonts({
    /* eslint-disable @typescript-eslint/no-unsafe-assignment */
    'ComicHams-BoldFlare': require('../../packages/fonts/files/ttf/ComicHams-BoldFlare.ttf'),
    'ComicHams-HeavyFlare': require('../../packages/fonts/files/ttf/ComicHams-HeavyFlare.ttf'),
    'ComicHams-SemiBoldFlare': require('../../packages/fonts/files/ttf/ComicHams-SemiBoldFlare.ttf'),
    'DMMono-Medium': require('../../packages/fonts/files/ttf/DMMono-Medium.ttf'),
    'DMMono-MediumItalic': require('../../packages/fonts/files/ttf/DMMono-MediumItalic.ttf'),
    'DMSans-Bold': require('../../packages/fonts/files/ttf/DMSans-Bold.ttf'),
    'DMSans-BoldItalic': require('../../packages/fonts/files/ttf/DMSans-BoldItalic.ttf'),
    'DMSans-Italic': require('../../packages/fonts/files/ttf/DMSans-Italic.ttf'),
    'DMSans-Regular': require('../../packages/fonts/files/ttf/DMSans-Regular.ttf'),
  });

  useEffect(() => {
    UnistylesRuntime.setTheme('light');
  }, []);

  if (!loaded) return null;
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StorybookUIRoot />
    </GestureHandlerRootView>
  );
};

export default App;
