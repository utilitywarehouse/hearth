import { TextProps, TextStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { BodyText } from '../BodyText';
import { useAlertContext } from './Alert.context';

const AlertText = ({ children, style, ...props }: TextProps & { semibold?: boolean }) => {
  const { colorScheme } = useAlertContext();
  styles.useVariants({ colorScheme });
  return (
    <BodyText size="md" style={[styles.text as TextStyle, style]} {...props}>
      {children}
    </BodyText>
  );
};

const styles = StyleSheet.create(theme => ({
  text: {
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

AlertText.displayName = 'AlertText';

export default AlertText;
