import { useMemo } from 'react';
import { Text } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useTheme } from '../../hooks';
import { getFlattenedColorValue } from '../../utils';
import type DetailTextProps from './DetailText.props';

const DetailText = ({
  children,
  color,
  size = 'md',
  truncated,
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
  inverted,
  ...props
}: DetailTextProps) => {
  const { color: themeColor, colorMode } = useTheme();
  styles.useVariants({
    size,
    underline,
    strikeThrough,
    italic,
    inverted,
  });
  const colorValue = useMemo(
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
};

DetailText.displayName = 'DetailText';

const styles = StyleSheet.create(theme => ({
  text: {
    color: theme.color.text.primary,
    fontWeight: theme.fontWeight.regular,
    fontFamily: theme.typography.mobile.detailText.fontFamily,
    fontStyle: 'normal',
    variants: {
      size: {
        '4xl': {
          fontSize: theme.typography.mobile.detailText['4xl'].fontSize,
          lineHeight: theme.typography.mobile.detailText['4xl'].lineHeight,
          letterSpacing: theme.typography.mobile.detailText['4xl'].letterSpacing,
        },
        '3xl': {
          fontSize: theme.typography.mobile.detailText['3xl'].fontSize,
          lineHeight: theme.typography.mobile.detailText['3xl'].lineHeight,
          letterSpacing: theme.typography.mobile.detailText['3xl'].letterSpacing,
        },
        '2xl': {
          fontSize: theme.typography.mobile.detailText['2xl'].fontSize,
          lineHeight: theme.typography.mobile.detailText['2xl'].lineHeight,
          letterSpacing: theme.typography.mobile.detailText['2xl'].letterSpacing,
        },
        xl: {
          fontSize: theme.typography.mobile.detailText.xl.fontSize,
          lineHeight: theme.typography.mobile.detailText.xl.lineHeight,
          letterSpacing: theme.typography.mobile.detailText.xl.letterSpacing,
        },
        lg: {
          fontSize: theme.typography.mobile.detailText.lg.fontSize,
          lineHeight: theme.typography.mobile.detailText.lg.lineHeight,
          letterSpacing: theme.typography.mobile.detailText.lg.letterSpacing,
        },
        md: {
          fontSize: theme.typography.mobile.detailText.md.fontSize,
          lineHeight: theme.typography.mobile.detailText.md.lineHeight,
          letterSpacing: theme.typography.mobile.detailText.md.letterSpacing,
        },
        sm: {
          fontSize: theme.typography.mobile.detailText.sm.fontSize,
          lineHeight: theme.typography.mobile.detailText.sm.lineHeight,
          letterSpacing: theme.typography.mobile.detailText.sm.letterSpacing,
        },
      },
      bold: {
        true: {
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
      inverted: {
        true: {
          color: theme.color.text.inverted,
        },
      },
    },
  },
}));

export default DetailText;
