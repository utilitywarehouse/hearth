import { TextProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { BodyText } from '../BodyText';
import { useBadgeContext } from './Badge.context';

const BadgeText = ({ children, style, ...props }: TextProps) => {
  const { variant, colorScheme } = useBadgeContext();
  styles.useVariants({ variant, colorScheme });
  return (
    <BodyText {...props} size="md" weight="semibold" style={[styles.text, style]}>
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
      },
      variant: {
        solid: {
          color: theme.color.text.primary,
        },
        outline: {},
      },
    },
    compoundVariants: [
      // Solid
      {
        colorScheme: 'info',
        variant: 'solid',
        styles: {
          color: theme.color.feedback.info.foreground.default,
        },
      },
      {
        colorScheme: 'danger',
        variant: 'solid',
        styles: {
          color: theme.color.feedback.danger.foreground.default,
        },
      },
      {
        colorScheme: 'positive',
        variant: 'solid',
        styles: {
          color: theme.color.feedback.positive.foreground.default,
        },
      },
      {
        colorScheme: 'warning',
        variant: 'solid',
        styles: {
          color: theme.color.feedback.warning.foreground.default,
        },
      },
      {
        colorScheme: 'functional',
        variant: 'solid',
        styles: {
          color: theme.color.feedback.functional.foreground.default,
        },
      },
      {
        colorScheme: 'energy',
        variant: 'solid',
        styles: {
          color: theme.color.text.primary,
        },
      },
      {
        colorScheme: 'broadband',
        variant: 'solid',
        styles: {
          color: theme.color.text.primary,
        },
      },
      {
        colorScheme: 'mobile',
        variant: 'solid',
        styles: {
          color: theme.color.text.primary,
        },
      },
      {
        colorScheme: 'insurance',
        variant: 'solid',
        styles: {
          color: theme.color.text.primary,
        },
      },
      {
        colorScheme: 'cashback',
        variant: 'solid',
        styles: {
          color: theme.color.text.primary,
        },
      },
      {
        colorScheme: 'pig',
        variant: 'solid',
        styles: {
          color: theme.color.text.primary,
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
