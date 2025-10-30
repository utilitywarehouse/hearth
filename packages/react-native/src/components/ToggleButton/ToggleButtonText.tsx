import { type TextProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { BodyText } from '../BodyText';

const ToggleButtonText = ({ children, toggled, ...props }: TextProps & { toggled: boolean }) => {
  styles.useVariants({ toggled });
  return (
    <BodyText size="md" weight="semibold" {...props} style={[styles.text, props.style]}>
      {children}
    </BodyText>
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
