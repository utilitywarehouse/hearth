import { Text } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useStyleProps } from '../../hooks';
import { getFlattenedColorValue, resolveThemeValueWithFallback } from '../../utils';
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
  const { computedStyles: utilityStyles, remainingProps } = useStyleProps(props);

  styles.useVariants({
    size,
    underline,
    strikeThrough,
    italic,
    inverted,
  });

  return (
    <Text
      {...remainingProps}
      {...(truncated
        ? {
            numberOfLines: 1,
            ellipsizeMode: 'tail',
          }
        : {})}
      style={[
        styles.text,
        utilityStyles,
        {
          ...(textTransform && { textTransform }),
          ...(textAlign && { textAlign }),
          ...(textDecorationLine && { textDecorationLine }),
          ...(textDecorationStyle && { textDecorationStyle }),
          ...(userSelect && { userSelect }),
          ...(textAlignVertical && { textAlignVertical }),
        },
        styles.getColours(color, textDecorationColor),
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
  getColours: (color?: string, textDecorationColor?: string) => ({
    ...(color
      ? { color: resolveThemeValueWithFallback(color, theme.helpers.semanticColor.text, theme.color) }
      : {}),
    ...(textDecorationColor
      ? { textDecorationColor: getFlattenedColorValue(textDecorationColor, theme.color) }
      : {}),
  }),
}));

export default DetailText;
