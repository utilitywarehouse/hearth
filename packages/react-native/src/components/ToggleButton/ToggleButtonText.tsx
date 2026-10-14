import { type TextProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { BodyText } from '../BodyText';
import { useToggleButtonContext } from './ToggleButton.context';

/**
 * The label of a `ToggleButton`, for composing a custom button. Its colour follows the
 * toggled state of the parent `ToggleButton`.
 */
const ToggleButtonText = ({
  children,
  toggled: toggledProp,
  ...props
}: TextProps & {
  /** Overrides the toggled state read from the parent `ToggleButton`. */
  toggled?: boolean;
}) => {
  const context = useToggleButtonContext();
  const toggled = toggledProp ?? context.toggled;
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
