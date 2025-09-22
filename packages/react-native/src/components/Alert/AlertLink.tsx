import { StyleSheet } from 'react-native-unistyles';
import { Link, LinkProps } from '../Link';
import { useAlertContext } from './Alert.context';

const AlertLink = ({ children, ...props }: LinkProps) => {
  const { colorScheme } = useAlertContext();
  styles.useVariants({ colorScheme });
  return (
    <Link {...props} textStyle={styles.link} iconStyle={styles.link}>
      {children}
    </Link>
  );
};

const styles = StyleSheet.create(theme => ({
  link: {
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
