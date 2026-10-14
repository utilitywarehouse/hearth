import { TickSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { Platform, type StyleProp, type ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Icon } from '../Icon';
import IconProps from '../Icon/Icon.props';
import { useToggleButtonContext } from './ToggleButton.context';

const ButtonIcon = ({
  children,
  toggled: toggledProp,
  as = TickSmallIcon,
  ...props
}: IconProps & {
  /** Overrides the toggled state read from the parent `ToggleButton`. */
  toggled?: boolean;
}) => {
  const context = useToggleButtonContext();
  const toggled = toggledProp ?? context.toggled;
  styles.useVariants({ toggled });

  const IconAny = Icon as any;
  return (
    <IconAny
      as={as}
      {...props}
      style={
        Platform.OS === 'web'
          ? { ...(styles.icon as StyleProp<ViewStyle>), ...props.style }
          : [styles.icon as StyleProp<ViewStyle>, props.style]
      }
    >
      {children}
    </IconAny>
  );
};

ButtonIcon.displayName = 'ButtonIcon';

const styles = StyleSheet.create(theme => ({
  icon: {
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

export default ButtonIcon;
