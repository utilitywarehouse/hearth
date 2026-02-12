import { useMemo } from 'react';
import { Text, TextStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useTheme } from '../../hooks';
import type { ColorValue } from '../../types';
import { getFlattenedColorValue } from '../../utils';
import type HeadingProps from './Heading.props';

const Heading = ({
  children,
  color,
  size = 'lg',
  truncated,
  underline,
  strikeThrough,
  textTransform,
  textAlign,
  textAlignVertical,
  textDecorationColor,
  textDecorationLine,
  textDecorationStyle,
  userSelect,
  inverted,
  ...props
}: HeadingProps) => {
  styles.useVariants({
    size,
    underline,
    strikeThrough,
    inverted,
  });
  const { color: themeColor, colorMode } = useTheme();
  const colorValue: ColorValue = useMemo(
    () => getFlattenedColorValue(color, themeColor),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [color, colorMode]
  );
  const decorationColor = useMemo(
    () => getFlattenedColorValue(textDecorationColor, themeColor),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [textDecorationColor, colorMode]
  );
  return (
    <Text
      {...props}
      {...(truncated
        ? {
            numberOfLines: 1,
            ellipsizeMode: 'tail',
          }
        : {})}
      style={[
        styles.text,
        {
          ...(colorValue ? { color: colorValue } : {}),
          ...(textTransform ? { textTransform } : {}),
          ...(textAlign ? { textAlign } : {}),
          ...(textAlignVertical ? { textAlignVertical } : {}),
          ...(decorationColor && { textDecorationColor: decorationColor }),
          ...(textDecorationLine && { textDecorationLine }),
          ...(textDecorationStyle && { textDecorationStyle }),
          ...(userSelect && { userSelect }),
        },
        props.style,
      ]}
    >
      {children}
    </Text>
  );
};

Heading.displayName = 'Heading';

const styles = StyleSheet.create(theme => ({
  text: {
    color: theme.color.text.primary,
    fontFamily: theme.typography.mobile.heading.fontFamily,
    marginVertical: 0,
    fontStyle: 'normal',
    variants: {
      size: {
        sm: {
          fontSize: {
            base: theme.typography.mobile.heading.sm.fontSize,
            md: theme.typography.tablet.heading.sm.fontSize,
            lg: theme.typography.desktop.heading.sm.fontSize,
          },
          fontWeight: {
            base: theme.typography.mobile.heading.sm.fontWeight,
            md: theme.typography.tablet.heading.sm.fontWeight,
            lg: theme.typography.desktop.heading.sm.fontWeight,
          },
          lineHeight: {
            base: theme.typography.mobile.heading.sm.lineHeight,
            md: theme.typography.tablet.heading.sm.lineHeight,
            lg: theme.typography.desktop.heading.sm.lineHeight,
          },
        },
        md: {
          fontSize: {
            base: theme.typography.mobile.heading.md.fontSize,
            md: theme.typography.tablet.heading.md.fontSize,
            lg: theme.typography.desktop.heading.md.fontSize,
          },
          fontWeight: {
            base: theme.typography.mobile.heading.md.fontWeight,
            md: theme.typography.tablet.heading.md.fontWeight,
            lg: theme.typography.desktop.heading.md.fontWeight,
          },
          lineHeight: {
            base: theme.typography.mobile.heading.md.lineHeight,
            md: theme.typography.tablet.heading.md.lineHeight,
            lg: theme.typography.desktop.heading.md.lineHeight,
          },
        },
        lg: {
          fontSize: {
            base: theme.typography.mobile.heading.lg.fontSize,
            md: theme.typography.tablet.heading.lg.fontSize,
            lg: theme.typography.desktop.heading.lg.fontSize,
          },
          fontWeight: {
            base: theme.typography.mobile.heading.lg.fontWeight,
            md: theme.typography.tablet.heading.lg.fontWeight,
            lg: theme.typography.desktop.heading.lg.fontWeight,
          },
          lineHeight: {
            base: theme.typography.mobile.heading.lg.lineHeight,
            md: theme.typography.tablet.heading.lg.lineHeight,
            lg: theme.typography.desktop.heading.lg.lineHeight,
          },
        },
        xl: {
          fontSize: {
            base: theme.typography.mobile.heading.xl.fontSize,
            md: theme.typography.tablet.heading.xl.fontSize,
            lg: theme.typography.desktop.heading.xl.fontSize,
          },
          fontWeight: {
            base: theme.typography.mobile.heading.xl.fontWeight,
            md: theme.typography.tablet.heading.xl.fontWeight,
            lg: theme.typography.desktop.heading.xl.fontWeight,
          },
          lineHeight: {
            base: theme.typography.mobile.heading.xl.lineHeight,
            md: theme.typography.tablet.heading.xl.lineHeight,
            lg: theme.typography.desktop.heading.xl.lineHeight,
          },
        },
        '2xl': {
          fontSize: {
            base: theme.typography.mobile.heading['2xl'].fontSize,
            md: theme.typography.tablet.heading['2xl'].fontSize,
            lg: theme.typography.desktop.heading['2xl'].fontSize,
          },
          fontWeight: {
            base: theme.typography.mobile.heading['2xl'].fontWeight,
            md: theme.typography.tablet.heading['2xl'].fontWeight,
            lg: theme.typography.desktop.heading['2xl'].fontWeight,
          },
          lineHeight: {
            base: theme.typography.mobile.heading['2xl'].lineHeight,
            md: theme.typography.tablet.heading['2xl'].lineHeight,
            lg: theme.typography.desktop.heading['2xl'].lineHeight,
          },
        },
      },
      underline: {
        true: {
          textDecorationLine: 'underline' as TextStyle['textDecorationLine'],
        },
      },
      strikeThrough: {
        true: {
          textDecorationLine: 'line-through' as TextStyle['textDecorationLine'],
        },
      },
      inverted: {
        true: {
          color: theme.color.text.inverted,
        },
      },
    },
  },
}));

export default Heading;
