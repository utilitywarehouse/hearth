import { Text } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useStyleProps } from '../../hooks';
import type BodyTextProps from './BodyText.props';

import { getFlattenedColorValue, resolveThemeValueWithFallback } from '../../utils';

const BodyText = ({
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
  inverted,
  ...props
}: BodyTextProps) => {
  // Extract margin utility props from remaining props
  const { computedStyles: utilityStyles, remainingProps } = useStyleProps(props);

  styles.useVariants({
    size,
    weight,
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

BodyText.displayName = 'BodyText';

const styles = StyleSheet.create(theme => ({
  text: {
    color: theme.color.text.primary,
    fontFamily: theme.typography.mobile.bodyText.fontFamily,
    fontStyle: 'normal',
    variants: {
      size: {
        xl: {
          fontSize: theme.typography.mobile.bodyText.xl.fontSize,
          lineHeight: theme.typography.mobile.bodyText.xl.lineHeight,
        },
        lg: {
          fontSize: theme.typography.mobile.bodyText.lg.fontSize,
          lineHeight: theme.typography.mobile.bodyText.lg.lineHeight,
        },
        md: {
          fontSize: theme.typography.mobile.bodyText.md.fontSize,
          lineHeight: theme.typography.mobile.bodyText.md.lineHeight,
        },
        sm: {
          fontSize: theme.typography.mobile.bodyText.sm.fontSize,
          lineHeight: theme.typography.mobile.bodyText.sm.lineHeight,
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
      inverted: {
        true: {
          color: theme.color.text.inverted,
        },
      },
    },
  },
  getColours: (color?: string, textDecorationColor?: string) => ({
    ...(color
      ? {
          color: resolveThemeValueWithFallback(
            color,
            theme.helpers.semanticColor.text,
            theme.color
          ),
        }
      : {}),
    ...(textDecorationColor
      ? { textDecorationColor: getFlattenedColorValue(textDecorationColor, theme.color) }
      : {}),
  }),
}));

export default BodyText;
