import { TextProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { BodyText } from '../BodyText';
import { useBadgeContext } from './Badge.context';

const BadgeText = ({ children, style, ...props }: TextProps) => {
  const { variant, colorScheme, size } = useBadgeContext();
  styles.useVariants({ variant, colorScheme });
  return (
    <BodyText {...props} size={size} weight="semibold" style={[styles.text, style]}>
      {children}
    </BodyText>
  );
};

BadgeText.displayName = 'BadgeText';

const styles = StyleSheet.create(theme => ({
  text: {
    variants: {
      colorScheme: {
        info: {},
        danger: {},
        positive: {},
        warning: {},
        functional: {},
        energy: {},
        broadband: {},
        mobile: {},
        insurance: {},
        cashback: {},
        pig: {},
        highlight: {},
      },
      variant: {
        emphasis: {
          color: theme.color.text.primary,
        },
        subtle: {
          color: theme.color.text.primary,
        },
        outline: {},
      },
    },
    compoundVariants: [
      // Emphasis
      {
        colorScheme: 'info',
        variant: 'emphasis',
        styles: {
          color: theme.color.feedback.info.foreground.default,
        },
      },
      {
        colorScheme: 'danger',
        variant: 'emphasis',
        styles: {
          color: theme.color.feedback.danger.foreground.default,
        },
      },
      {
        colorScheme: 'positive',
        variant: 'emphasis',
        styles: {
          color: theme.color.feedback.positive.foreground.default,
        },
      },
      {
        colorScheme: 'warning',
        variant: 'emphasis',
        styles: {
          color: theme.color.feedback.warning.foreground.default,
        },
      },
      {
        colorScheme: 'functional',
        variant: 'emphasis',
        styles: {
          color: theme.color.feedback.functional.foreground.default,
        },
      },
      // Subtle
      {
        colorScheme: 'info',
        variant: 'subtle',
        styles: {
          color: theme.color.feedback.info.foreground.default,
        },
      },
      {
        colorScheme: 'danger',
        variant: 'subtle',
        styles: {
          color: theme.color.feedback.danger.foreground.default,
        },
      },
      {
        colorScheme: 'positive',
        variant: 'subtle',
        styles: {
          color: theme.color.feedback.positive.foreground.default,
        },
      },
      {
        colorScheme: 'warning',
        variant: 'subtle',
        styles: {
          color: theme.color.feedback.warning.foreground.default,
        },
      },
      {
        colorScheme: 'functional',
        variant: 'subtle',
        styles: {
          color: theme.color.feedback.functional.foreground.default,
        },
      },
      // Outline
      {
        colorScheme: 'info',
        variant: 'outline',
        styles: {
          color: theme.color.feedback.info.foreground.subtle,
        },
      },
      {
        colorScheme: 'danger',
        variant: 'outline',
        styles: {
          color: theme.color.feedback.danger.foreground.subtle,
        },
      },
      {
        colorScheme: 'positive',
        variant: 'outline',
        styles: {
          color: theme.color.feedback.positive.foreground.subtle,
        },
      },
      {
        colorScheme: 'warning',
        variant: 'outline',
        styles: {
          color: theme.color.feedback.warning.foreground.subtle,
        },
      },
      {
        colorScheme: 'functional',
        variant: 'outline',
        styles: {
          color: theme.color.feedback.functional.foreground.subtle,
        },
      },
    ],
  },
}));

BadgeText.displayName = 'BadgeText';

export default BadgeText;
