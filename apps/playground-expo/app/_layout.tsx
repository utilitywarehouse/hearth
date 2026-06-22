import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    'ComicHams-BoldFlare': require('../assets/fonts/comichams_boldflare.ttf'),
    'ComicHams-SemiBoldFlare': require('../assets/fonts/comichams_semiboldflare.ttf'),
    'DM Mono': require('../assets/fonts/dmmono_medium.ttf'),
    'DMMono-MediumItalic': require('../assets/fonts/dmmono_mediumitalic.ttf'),
    'DMSans-Bold': require('../assets/fonts/dmsans_bold.ttf'),
    'DMSans-BoldItalic': require('../assets/fonts/dmsans_bolditalic.ttf'),
    'DMSans-SemiBold': require('../assets/fonts/dmsans_semibold.ttf'),
    'DMSans-SemiBoldItalic': require('../assets/fonts/dmsans_semibolditalic.ttf'),
    'DMSans-Italic': require('../assets/fonts/dmsans_italic.ttf'),
    'DMSans-Regular': require('../assets/fonts/dmsans_regular.ttf'),
  });

  if (!loaded) return null;

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="modal"
            options={{
              presentation: 'modal',
              headerShown: false,
              animation: 'slide_from_bottom',
            }}
          />
          <Stack.Screen
            name="modal-full"
            options={{
              presentation: 'fullScreenModal',
              headerShown: false,
              animation: 'slide_from_bottom',
            }}
          />
        </Stack>
      </GestureHandlerRootView>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
