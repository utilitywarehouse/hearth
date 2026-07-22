import { StyleSheet } from 'react-native-unistyles';
import { breakpoints } from './breakpoints';
import { themes } from './themes';

StyleSheet.configure({
  breakpoints,
  themes,
  settings: {
    initialTheme: 'light',
    adaptiveThemes: false,
  },
});
