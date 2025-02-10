import React, { PropsWithChildren, useEffect } from 'react';
import { breakpoints } from './breakpoints';
import { themes } from './themes';
import { StyleSheet, UnistylesRuntime, UnistylesThemes } from 'react-native-unistyles';

StyleSheet.configure({
  breakpoints,
  themes,
  settings: {
    initialTheme: 'light',
    adaptiveThemes: false,
  },
});

const HearthUIProvider: React.FC<PropsWithChildren<{ colorMode?: keyof UnistylesThemes }>> = ({
  children,
  colorMode = 'light',
}) => {
  useEffect(() => {
    UnistylesRuntime.setTheme(colorMode === 'dark' ? 'dark' : 'light');
  }, [colorMode]);
  return children;
};

export default HearthUIProvider;
