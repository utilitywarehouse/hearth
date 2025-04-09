import React, { useEffect, useState } from 'react';
import { ScrollView, useColorScheme } from 'react-native';
import { useArgs } from '@storybook/preview-api';
import { Linking } from 'react-native';
import { navigate } from './utils';
import { UnistylesRuntime } from 'react-native-unistyles';
import { color } from '@utilitywarehouse/hearth-tokens';

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
    (Story, { parameters }) => {
      const theme = useColorScheme() === 'dark' ? 'dark' : 'light';
      const [args, updateArgs] = useArgs();
      const [themeColourMode, setColourMode] = useState<'dark' | 'light'>(theme);
      useEffect(() => {
        Linking.addEventListener('url', event => {
          const url = new URL(event.url ?? '');
          const params = new URLSearchParams(url.search);
          const { colourMode, storyId, ...rest } = Object.fromEntries(params.entries());

          // Convert "true" and "false" strings in args to boolean values
          const convertedArgs = Object.fromEntries(
            Object.entries(rest).map(([key, value]) => [
              key,
              value === 'true' ? true : value === 'false' ? false : value,
            ])
          );

          navigate({ storyId });
          updateArgs({
            ...args,
            ...convertedArgs,
          });
          // if (colourMode) {
          //   setColourMode(colourMode as 'dark' | 'light');
          //   UnistylesRuntime.setTheme(colourMode as 'dark' | 'light');
          // }
        });
        return () => Linking.removeAllListeners('url');
      }, []);

      // useEffect(() => {
      //   setColourMode(theme);
      //   UnistylesRuntime.setTheme(theme);
      // }, [theme]);

      const bg = (() => {
        if (parameters.noBackground === true) {
          return undefined;
        }
        if (args.inverted) {
          return color.common.uwPurple;
        }
        // return themeColourMode === 'dark' ? '#1D1D1D' : color.light.warmWhite['50'];
        return color.light.warmWhite['50'];
      })();

      return (
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: bg,
          }}
          contentContainerStyle={{ padding: 8, flex: 1 }}
        >
          <Story />
        </ScrollView>
      );
    },
  ],
};

export default preview;
