import {
  InfoMediumIcon,
  TickCircleMediumIcon,
  WarningMediumIcon,
} from '@utilitywarehouse/hearth-react-native-icons';
import { StyleSheet } from 'react-native-unistyles';
import { Icon } from '../Icon';
import type IconProps from '../Icon/Icon.props';
import { useAlertContext } from './Alert.context';

const AlertIcon = (props: IconProps) => {
  const { colorScheme } = useAlertContext();
  const asProp = (() => {
    if (colorScheme === 'danger' || colorScheme === 'warning') {
      return WarningMediumIcon;
    }
    if (colorScheme === 'positive') {
      return TickCircleMediumIcon;
    }
    return InfoMediumIcon;
  })();
  styles.useVariants({ colorScheme });
  return <Icon {...props} as={props.as ?? asProp} style={styles.icon} />;
};

AlertIcon.displayName = 'AlertIcon';

const styles = StyleSheet.create(theme => ({
  icon: {
    width: theme.components.icon.md.width,
    height: theme.components.icon.md.height,
    minWidth: theme.components.icon.md.width,
    minHeight: theme.components.icon.md.height,
    alignSelf: 'flex-start',
    variants: {
      colorScheme: {
        info: {
          color: theme.color.feedback.info.foreground.default,
        },
        positive: {
          color: theme.color.feedback.positive.foreground.default,
        },
        danger: {
          color: theme.color.feedback.danger.foreground.default,
        },
        warning: {
          color: theme.color.feedback.warning.foreground.default,
        },
      },
    },
  },
}));

export default AlertIcon;
