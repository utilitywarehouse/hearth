import { DimensionValue, Platform, TextStyle } from 'react-native';
import { breakpoints } from './breakpoints';
import { components, color, layout, primitive, typography } from '@utilitywarehouse/hearth-tokens';

const shared = {
  platform: Platform.OS,
  space: {
    ...primitive.space,
    full: '100%' as DimensionValue,
  },
  borderWidth: primitive['border-width'],
  borderRadius: primitive['border-radius'],
  breakpoints,
  letterSpacing: primitive['letter-spacing'],
  lineHeight: primitive['line-height'],
  fontWeight: primitive.font.weight as {
    [K in keyof typeof primitive.font.weight]: TextStyle['fontWeight'];
  },
  fontFamily: primitive.font.family,
  fontSize: primitive.font.size,
  typography,
  layout,
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
};

export const lightTheme = {
  colorMode: 'light',
  isLight: true,
  isDark: false,
  color: {
    ...color.light,
    ...color.common,
    black: '#000000',
  },
  components: components.light,
  ...shared,
};

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
};

export const appThemes = {
  light: lightTheme,
  dark: darkTheme,
};
