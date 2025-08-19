import { StyleSheet } from 'react-native-unistyles';
import { Icon } from '../Icon';
import type IconProps from '../Icon/Icon.props';
import { useBadgeContext } from './Badge.context';

const BadgeIcon = (props: IconProps) => {
  const { colorScheme, variant } = useBadgeContext();
  styles.useVariants({ colorScheme, variant });
  return <Icon {...props} style={styles.icon} />;
};

BadgeIcon.displayName = 'BadgeIcon';

const styles = StyleSheet.create(theme => ({
  icon: {
    width: 20,
    height: 20,
    minWidth: 20,
    minHeight: 20,
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
          color: theme.color.icon.primary,
        },
      },
      {
        colorScheme: 'broadband',
        variant: 'solid',
        styles: {
          color: theme.color.icon.primary,
        },
      },
      {
        colorScheme: 'mobile',
        variant: 'solid',
        styles: {
          color: theme.color.icon.primary,
        },
      },
      {
        colorScheme: 'insurance',
        variant: 'solid',
        styles: {
          color: theme.color.icon.primary,
        },
      },
      {
        colorScheme: 'cashback',
        variant: 'solid',
        styles: {
          color: theme.color.icon.primary,
        },
      },
      {
        colorScheme: 'pig',
        variant: 'solid',
        styles: {
          color: theme.color.icon.primary,
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

export default BadgeIcon;
