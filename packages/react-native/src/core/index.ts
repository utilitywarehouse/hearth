import { StyleSheet } from 'react-native-unistyles';
import { breakpoints } from './breakpoints';
import { themes } from './themes';
export {
  createUnistylesElement,
  Display,
  getServerUnistyles,
  Hide,
  hydrateServerUnistyles,
  mq,
  NavigationBar,
  resetServerUnistyles,
  ScopedTheme,
  StatusBar,
  StyleSheet,
  UnistylesRuntime,
  useServerUnistyles,
  useUnistyles,
  withUnistyles,
} from 'react-native-unistyles';
export type {
  UnistylesBreakpoints,
  UnistylesThemes,
  UnistylesVariants,
} from 'react-native-unistyles';
export * from './breakpoints';
export * from './themes';

StyleSheet.configure({
  breakpoints,
  themes,
  settings: {
    initialTheme: 'light',
    adaptiveThemes: false,
  },
});

export type * from '../types/unistyles';
