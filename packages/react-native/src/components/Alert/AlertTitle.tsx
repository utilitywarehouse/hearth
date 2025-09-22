import type { TextProps, TextStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { DetailText } from '../DetailText';
import { useAlertContext } from './Alert.context';

const AlertTitle = ({ children, style, ...props }: TextProps) => {
  const { colorScheme } = useAlertContext();
  styles.useVariants({ colorScheme });
  return (
    <DetailText size="md" style={[styles.title as TextStyle, style]} {...props}>
      {children}
    </DetailText>
  );
};

const styles = StyleSheet.create(theme => ({
  title: {
    variants: {
      colorScheme: {
        info: {
          color: theme.color.feedback.info.foreground,
        },
        positive: {
          color: theme.color.feedback.positive.foreground,
        },
        danger: {
          color: theme.color.feedback.danger.foreground,
        },
        warning: {
          color: theme.color.feedback.warning.foreground,
        },
      },
    },
  },
}));

AlertTitle.displayName = 'AlertTitle';

export default AlertTitle;
