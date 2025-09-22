import { StyleSheet } from 'react-native-unistyles';
import { Link, LinkProps } from '../Link';
import { useAlertContext } from './Alert.context';

const AlertLink = ({ children, ...props }: LinkProps) => {
  const { colorScheme } = useAlertContext();
  styles.useVariants({ colorScheme });
  return (
    <Link {...props} textStyle={styles.text} iconStyle={styles.icon}>
      {children}
    </Link>
  );
};

const styles = StyleSheet.create(theme => ({
  text: {
    variants: {
      colorScheme: {
        info: {
          color: theme.color.feedback.info.foreground.default,
          textDecorationColor: theme.color.feedback.info.foreground.default,
        },
        positive: {
          color: theme.color.feedback.positive.foreground.default,
          textDecorationColor: theme.color.feedback.positive.foreground.default,
        },
        danger: {
          color: theme.color.feedback.danger.foreground.default,
          textDecorationColor: theme.color.feedback.danger.foreground.default,
        },
        warning: {
          color: theme.color.feedback.warning.foreground.default,
          textDecorationColor: theme.color.feedback.warning.foreground.default,
        },
      },
    },
  },
  icon: {
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

AlertLink.displayName = 'AlertLink';

export default AlertLink;
