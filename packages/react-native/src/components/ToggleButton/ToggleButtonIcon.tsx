import { TickSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { Platform, type StyleProp, type ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Icon } from '../Icon';
import IconProps from '../Icon/Icon.props';

const ButtonIcon = ({
  children,
  toggled,
  as = TickSmallIcon,
  ...props
}: IconProps & { toggled: boolean }) => {
  styles.useVariants({ toggled });

  const IconAny = Icon as any;
  return (
    <IconAny
      as={as}
      {...props}
      style={
        Platform.OS === 'web'
          ? // @ts-ignore
            { ...(styles.icon as StyleProp<ViewStyle>), ...props.style }
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
