import { Label, StyleSheet, Switch, useColorMode } from '@utilitywarehouse/hearth-react-native';
import React, { useEffect } from 'react';
import { Appearance, ScrollView, View } from 'react-native';

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
      const [colorMode, setColorMode] = useColorMode();

      styles.useVariants({ inverted: args.inverted });

      useEffect(() => {
        setColorMode(Appearance.getColorScheme() || 'light');
      }, []);

      return (
        <>
          <View style={styles.topBar} key={colorMode}>
            <Label>{colorMode === 'dark' ? 'Dark mode on' : 'Dark mode off'}</Label>
            <Switch
              value={colorMode === 'dark'}
              size="small"
              onValueChange={() => {
                Appearance.setColorScheme(colorMode === 'dark' ? 'light' : 'dark');
                setColorMode(colorMode === 'dark' ? 'light' : 'dark');
              }}
            />
          </View>
          {parameters.noScroll ? (
            <View style={styles.container}>
              <Story />
            </View>
          ) : (
            <ScrollView style={styles.container} contentContainerStyle={styles.story}>
              <Story />
            </ScrollView>
          )}
        </>
      );
    },
  ],
};

const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.color.background.primary,
    variants: {
      inverted: {
        true: {
          backgroundColor: theme.color.background.brand,
        },
      },
    },
  },
  story: {
    padding: theme.space[100],
    flex: 1,
  },
  topBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: theme.space[100],
    padding: theme.space[100],
  },
}));

export default preview;
