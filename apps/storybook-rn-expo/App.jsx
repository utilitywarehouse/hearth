import { LogBox } from 'react-native';
import { useFonts } from 'expo-font';
import StorybookUIRoot from './.rnstorybook';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import '@utilitywarehouse/hearth-react-native';

LogBox.ignoreAllLogs();

const App = () => {
  const [loaded] = useFonts({
    /* eslint-disable @typescript-eslint/no-unsafe-assignment */
    'ComicHams-BoldFlare': require('./assets/fonts/comichams_boldflare.ttf'),
    'ComicHams-SemiBoldFlare': require('./assets/fonts/comichams_semiboldflare.ttf'),
    'DM Mono': require('./assets/fonts/dmmono_medium.ttf'),
    'DMMono-MediumItalic': require('./assets/fonts/dmmono_mediumitalic.ttf'),
    'DMSans-Bold': require('./assets/fonts/dmsans_bold.ttf'),
    'DMSans-BoldItalic': require('./assets/fonts/dmsans_bolditalic.ttf'),
    'DMSans-SemiBold': require('./assets/fonts/dmsans_semibold.ttf'),
    'DMSans-SemiBoldItalic': require('./assets/fonts/dmsans_semibolditalic.ttf'),
    'DMSans-Italic': require('./assets/fonts/dmsans_italic.ttf'),
    'DMSans-Regular': require('./assets/fonts/dmsans_regular.ttf'),
  });

  if (!loaded) return null;
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StorybookUIRoot />
    </GestureHandlerRootView>
  );
};

export default App;
