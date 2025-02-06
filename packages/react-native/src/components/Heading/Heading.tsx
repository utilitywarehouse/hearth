/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { forwardRef, useMemo } from 'react';
import { Text, TextStyle } from 'react-native';
import type HeadingProps from './Heading.props';
import { StyleSheet } from 'react-native-unistyles';
import type { ColorValue } from '../../types';
import { useTheme } from '../../hooks';
import { getFlattenedColorValue } from '../../utils';

const Heading = forwardRef<Text, HeadingProps>(
  (
    {
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
      ...props
    },
    ref
  ) => {
    styles.useVariants({
      size,
      underline,
      strikeThrough,
    });
    const { color: themeColor, colorMode } = useTheme();
    const colorValue: ColorValue = useMemo(
      () => getFlattenedColorValue(color, themeColor),
      [color, colorMode]
    );
    const decorationColor = useMemo(
      () => getFlattenedColorValue(textDecorationColor, themeColor),
      [textDecorationColor, colorMode]
    );
    return (
      <Text
        ref={ref}
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
  }
);

Heading.displayName = 'Heading';

const styles = StyleSheet.create(theme => ({
  text: {
    color: theme.color.grey['1000'],
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
          letterSpacing: {
            base: theme.typography.mobile.heading.sm.letterSpacing,
            md: theme.typography.tablet.heading.sm.letterSpacing,
            lg: theme.typography.desktop.heading.sm.letterSpacing,
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
          letterSpacing: {
            base: theme.typography.mobile.heading.md.letterSpacing,
            md: theme.typography.tablet.heading.md.letterSpacing,
            lg: theme.typography.desktop.heading.md.letterSpacing,
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
          letterSpacing: {
            base: theme.typography.mobile.heading.lg.letterSpacing,
            md: theme.typography.tablet.heading.lg.letterSpacing,
            lg: theme.typography.desktop.heading.lg.letterSpacing,
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
          letterSpacing: {
            base: theme.typography.mobile.heading.xl.letterSpacing,
            md: theme.typography.tablet.heading.xl.letterSpacing,
            lg: theme.typography.desktop.heading.xl.letterSpacing,
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
    },
  },
}));

export default Heading;
