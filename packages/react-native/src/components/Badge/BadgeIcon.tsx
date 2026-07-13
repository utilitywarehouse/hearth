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
    width: theme.components.icon.sm.width,
    height: theme.components.icon.sm.height,
    minWidth: theme.components.icon.sm.width,
    minHeight: theme.components.icon.sm.height,
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

export default BadgeIcon;
