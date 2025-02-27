import { DimensionValue, Platform } from 'react-native';
import { breakpoints } from './breakpoints';
import {
  components,
  color,
  layout,
  typography,
  shadow,
  borderWidth,
  borderRadius,
  font,
  letterSpacing,
  lineHeight,
  space,
} from '@utilitywarehouse/hearth-tokens/js';

const shared = {
  platform: Platform.OS,
  space: {
    ...space,
    full: '100%' as DimensionValue,
  },
  borderWidth,
  borderRadius,
  breakpoints,
  letterSpacing,
  lineHeight,
  fontWeight: font.weight,
  fontFamily: font.family,
  fontSize: font.size,
  typography,
  layout,
  shadow,
  opacity: {
    disabled: 0.5,
  },
  globalStyle: {
    variants: {
      hardShadow: {
        '1': {
          shadowColor: color.light.grey[900],
          shadowOffset: {
            width: -2,
            height: 2,
          },
          shadowRadius: 8,
          shadowOpacity: 0.5,
          elevation: 10,
        },
        '2': {
          shadowColor: color.light.grey[900],
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowRadius: 8,
          shadowOpacity: 0.5,
          elevation: 10,
        },
        '3': {
          shadowColor: color.light.grey[900],
          shadowOffset: {
            width: 2,
            height: 2,
          },
          shadowRadius: 8,
          shadowOpacity: 0.5,
          elevation: 10,
        },
        '4': {
          shadowColor: color.light.grey[900],
          shadowOffset: {
            width: 0,
            height: -3,
          },
          shadowRadius: 8,
          shadowOpacity: 0.5,
          elevation: 10,
        },
        '5': {
          shadowColor: color.light.grey[900],
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowRadius: 8,
          shadowOpacity: 0.2,
          elevation: 10,
        },
      },
      softShadow: {
        '1': {
          shadowColor: color.light.grey[900],
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowRadius: 10,
          shadowOpacity: 0.1,
          _android: {
            shadowColor: color.light.grey[900],
            elevation: 5,
            shadowOpacity: 0.05,
          },
        },
        '2': {
          shadowColor: color.light.grey[900],
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowRadius: 20,
          elevation: 3,
          shadowOpacity: 0.1,
          _android: {
            shadowColor: color.light.grey[900],
            elevation: 10,
            shadowOpacity: 0.1,
          },
        },
        '3': {
          shadowColor: color.light.grey[900],
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowRadius: 30,
          shadowOpacity: 0.1,
          elevation: 4,
          _android: {
            shadowColor: color.light.grey[900],
            elevation: 15,
            shadowOpacity: 0.15,
          },
        },
        '4': {
          shadowColor: color.light.grey[900],
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowRadius: 40,
          shadowOpacity: 0.1,
          elevation: 10,
          _android: {
            shadowColor: color.light.grey[900],
            elevation: 20,
            shadowOpacity: 0.2,
          },
        },
      },
    },
  },
} as const;

export const lightTheme = {
  colorMode: 'light',
  isLight: true,
  isDark: false,
  color: {
    ...color.light,
    ...color.common,
    black: '#000000',
  } as const,
  components: components.light,
  ...shared,
} as const;

export const darkTheme = {
  colorMode: 'dark',
  isLight: false,
  isDark: true,
  color: {
    ...color.dark,
    ...color.common,
    black: '#000000',
  },
  components: components.dark,
  ...shared,
} as const;

export const themes = {
  light: lightTheme,
  dark: darkTheme,
} as const;
