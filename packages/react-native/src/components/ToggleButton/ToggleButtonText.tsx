import { type TextProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { DetailText } from '../DetailText';

const ToggleButtonText = ({ children, toggled, ...props }: TextProps & { toggled: boolean }) => {
  styles.useVariants({ toggled });
  return (
    <DetailText size="md" {...props} style={[styles.text, props.style]}>
      {children}
    </DetailText>
  );
};

ToggleButtonText.displayName = 'ToggleButtonText';

const styles = StyleSheet.create(theme => ({
  text: {
    color: theme.color.interactive.neutral.foreground.subtle,
    variants: {
      toggled: {
        true: {
          color: theme.color.interactive.brand.foreground.strong,
        },
      },
    },
  },
}));

export default ToggleButtonText;
