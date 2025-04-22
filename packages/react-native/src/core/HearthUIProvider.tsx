import React, { PropsWithChildren, useEffect } from 'react';
import { breakpoints } from './breakpoints';
import { themes } from './themes';
import { StyleSheet, UnistylesRuntime, UnistylesThemes } from 'react-native-unistyles';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

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
  return <BottomSheetModalProvider>{children}</BottomSheetModalProvider>;
};

export default HearthUIProvider;
