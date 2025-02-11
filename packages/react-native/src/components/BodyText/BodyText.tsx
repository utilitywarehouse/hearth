/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { forwardRef, useMemo } from 'react';
import { Text } from 'react-native';
import type BodyTextProps from './BodyText.props';
import { StyleSheet } from 'react-native-unistyles';
import { useTheme } from '../../hooks';
import { getFlattenedColorValue } from '../../utils';

const BodyText = forwardRef<Text, BodyTextProps>(
  (
    {
      children,
      color,
      size = 'md',
      truncated,
      weight = 'regular',
      underline,
      strikeThrough,
      italic,
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
    const { color: themeColor, colorMode } = useTheme();
    styles.useVariants({
      size,
      weight,
      underline,
      strikeThrough,
      italic,
    });
    const colorValue = useMemo(() => getFlattenedColorValue(color, themeColor), [color, colorMode]);
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
            ...(colorValue && { color: colorValue }),
            ...(textTransform && { textTransform }),
            ...(textAlign && { textAlign }),
            ...(decorationColor && { textDecorationColor: decorationColor }),
            ...(textDecorationLine && { textDecorationLine }),
            ...(textDecorationStyle && { textDecorationStyle }),
            ...(userSelect && { userSelect }),
            ...(textAlignVertical && { textAlignVertical }),
          },
          props.style,
        ]}
      >
        {children}
      </Text>
    );
  }
);

BodyText.displayName = 'BodyText';

const styles = StyleSheet.create(theme => ({
  text: {
    color: theme.color.grey['1000'],
    fontFamily: theme.typography.mobile.bodyText.fontFamily,
    fontStyle: 'normal',
    variants: {
      size: {
        lg: {
          fontSize: theme.typography.mobile.bodyText.lg.fontSize,
          lineHeight: theme.typography.mobile.bodyText.lg.lineHeight,
          letterSpacing: theme.typography.mobile.bodyText.lg.letterSpacing,
        },
        md: {
          fontSize: theme.typography.mobile.bodyText.md.fontSize,
          lineHeight: theme.typography.mobile.bodyText.md.lineHeight,
          letterSpacing: theme.typography.mobile.bodyText.md.letterSpacing,
        },
        sm: {
          fontSize: theme.typography.mobile.bodyText.sm.fontSize,
          lineHeight: theme.typography.mobile.bodyText.sm.lineHeight,
          letterSpacing: theme.typography.mobile.bodyText.sm.letterSpacing,
        },
      },
      weight: {
        regular: {
          fontWeight: theme.fontWeight.regular,
        },
        semibold: {
          fontWeight: theme.fontWeight.semibold,
        },
        bold: {
          fontWeight: theme.fontWeight.bold,
        },
      },
      underline: {
        true: {
          textDecorationLine: 'underline',
        },
      },
      strikeThrough: {
        true: {
          textDecorationLine: 'line-through',
        },
      },
      italic: {
        true: {
          fontStyle: 'italic',
        },
      },
    },
  },
}));

export default BodyText;
