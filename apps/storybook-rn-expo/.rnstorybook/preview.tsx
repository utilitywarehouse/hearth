import { color } from '@utilitywarehouse/hearth-tokens';
import React, { useEffect, useState } from 'react';
import { Appearance, ScrollView, View } from 'react-native';
import { UnistylesRuntime } from 'react-native-unistyles';

/** @type{import("@storybook/react-vite").Preview} */
const preview = {
  parameters: {
    controls: {
      matchers: {
        date: /Date$/,
      },
    },
  },

  decorators: [
    (Story, { parameters, args }) => {
      // const theme = useColorScheme() === 'dark' ? 'dark' : 'light';
      // const { colorMode } = useTheme();
      // const [args, updateArgs] = useArgs();
      // const [themeColourMode, setColourMode] = useState<'dark' | 'light'>(theme);

      // useEffect(() => {
      //   Linking.addEventListener('url', event => {
      //     const url = new URL(event.url ?? '');
      //     const params = new URLSearchParams(url.search);
      //     const { colourMode, storyId, ...rest } = Object.fromEntries(params.entries());

      //     // Convert "true" and "false" strings in args to boolean values
      //     const convertedArgs = Object.fromEntries(
      //       Object.entries(rest).map(([key, value]) => [
      //         key,
      //         value === 'true' ? true : value === 'false' ? false : value,
      //       ])
      //     );

      //     navigate({ storyId });
      //     updateArgs({
      //       ...args,
      //       ...convertedArgs,
      //     });
      //     // if (colourMode) {
      //     //   setColourMode(colourMode as 'dark' | 'light');
      //     //   UnistylesRuntime.setTheme(colourMode as 'dark' | 'light');
      //     // }
      //   });
      //   return () => Linking.removeAllListeners('url');
      // }, []);

      const [colorMode, setColorMode] = useState<'dark' | 'light'>(Appearance.getColorScheme());

      useEffect(() => {
        const colorScheme = Appearance.getColorScheme();
        UnistylesRuntime.setTheme(colorScheme === 'dark' ? 'dark' : 'light');

        const listerner = Appearance.addChangeListener(({ colorScheme: newColorScheme }) => {
          UnistylesRuntime.setTheme(newColorScheme === 'dark' ? 'dark' : 'light');
          setColorMode(newColorScheme === 'dark' ? 'dark' : 'light');
        });
        return () => {
          listerner.remove();
        };
      }, []);

      const bg = (() => {
        if (parameters.noBackground === true) {
          return undefined;
        }
        if (args.inverted) {
          return color.purple['700'];
        }
        return colorMode === 'dark' ? color.dark.background : color.light.background;
      })();

      // console.log(colorMode)

      return parameters.noScroll ? (
        <View
          style={{
            flex: 1,
            backgroundColor: bg,
          }}
        >
          <Story />
        </View>
      ) : (
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: bg,
          }}
          contentContainerStyle={{ padding: 8 }}
        >
          <Story />
        </ScrollView>
      );
    },
  ],
};

export default preview;
