import { StyleSheet } from 'react-native-unistyles';
import { useBadgeContext } from './Badge.context';
import { Icon } from '../Icon';
import type IconProps from '../Icon/Icon.props';

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
    alignSelf: 'flex-start',
    variants: {
      colorScheme: {
        blue: {},
        red: {},
        green: {},
        orange: {},
        grey: {},
      },
      variant: {
        solid: {
          color: theme.components.badge.solid.color,
        },
        outline: {},
      },
    },
    compoundVariants: [
      {
        colorScheme: 'blue',
        variant: 'outline',
        styles: {
          color: theme.components.badge.outline.blue.color,
        },
      },
      {
        colorScheme: 'red',
        variant: 'outline',
        styles: {
          color: theme.components.badge.outline.red.color,
        },
      },
      {
        colorScheme: 'green',
        variant: 'outline',
        styles: {
          color: theme.components.badge.outline.green.color,
        },
      },
      {
        colorScheme: 'orange',
        variant: 'outline',
        styles: {
          color: theme.components.badge.outline.orange.color,
        },
      },
      {
        colorScheme: 'grey',
        variant: 'outline',
        styles: {
          color: theme.components.badge.outline.grey.color,
        },
      },
    ],
  },
}));

export default BadgeIcon;
