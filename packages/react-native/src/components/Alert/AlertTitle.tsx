import type { TextProps, TextStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { BodyText } from '../BodyText';
import { useAlertContext } from './Alert.context';

const AlertTitle = ({ children, style, ...props }: TextProps) => {
  const { colorScheme } = useAlertContext();
  styles.useVariants({ colorScheme });
  return (
    <BodyText size="md" weight="semibold" style={[styles.title as TextStyle, style]} {...props}>
      {children}
    </BodyText>
  );
};

const styles = StyleSheet.create(theme => ({
  title: {
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

AlertTitle.displayName = 'AlertTitle';

export default AlertTitle;
