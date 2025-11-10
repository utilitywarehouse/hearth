import { Platform, StyleProp, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Icon } from '../Icon';
import IconProps from '../Icon/Icon.props';
import { useUnstyledIconButtonContext } from './UnstyledIconButton.context';

const UnstyledIconButtonIcon = ({ children, ...props }: IconProps) => {
  const { active, inverted, size } = useUnstyledIconButtonContext();
  styles.useVariants({ active, inverted, size });
  return (
    <Icon
      {...props}
      style={
        Platform.OS === 'web'
          ? // @ts-ignore
            { ...(styles.icon as StyleProp<ViewStyle>), ...props.style }
          : [styles.icon as ViewStyle, props.style]
      }
    >
      {children}
    </Icon>
  );
};

UnstyledIconButtonIcon.displayName = 'UnstyledIconButtonIcon';

const styles = StyleSheet.create(theme => ({
  icon: {
    color: theme.components.iconButton.unstyled.foregroundColor,
    _web: {
      _hover: {
        color: theme.components.iconButton.unstyled.foregroundColorHover,
      },
    },
    variants: {
      active: {
        true: {
          color: theme.components.iconButton.unstyled.foregroundColorActive,
        },
      },
      inverted: {
        true: {
          color: theme.components.iconButton.unstyled.inverted.foregroundColor,
          _web: {
            _hover: {
              color: theme.components.iconButton.unstyled.inverted.foregroundColorHover,
            },
          },
        },
      },
      size: {
        sm: {
          width: theme.components.iconButton.unstyled.sm.width,
          height: theme.components.iconButton.unstyled.sm.height,
        },
        md: {
          width: theme.components.iconButton.unstyled.md.width,
          height: theme.components.iconButton.unstyled.md.height,
        },
      },
    },
    compoundVariants: [
      {
        active: true,
        inverted: true,
        styles: {
          color: theme.components.iconButton.unstyled.inverted.foregroundColorActive,
        },
      },
    ],
  },
}));

export default UnstyledIconButtonIcon;
