import { StyleSheet } from 'react-native-unistyles';
import { themes } from './themes';
import { breakpoints } from './breakpoints';
export * from './themes';
export * from './breakpoints';
export {
  StyleSheet,
  UnistylesRuntime,
  withUnistyles,
  Hide,
  Display,
  ScopedTheme,
  mq,
  getServerUnistyles,
  useUnistyles,
  hydrateServerUnistyles,
  useServerUnistyles,
  resetServerUnistyles,
} from 'react-native-unistyles';
export type {
  UnistylesBreakpoints,
  UnistylesThemes,
  UnistylesVariants,
} from 'react-native-unistyles';

StyleSheet.configure({
  breakpoints,
  themes,
  settings: {
    initialTheme: 'light',
    adaptiveThemes: false,
  },
});

export type * from '../types/unistyles';
