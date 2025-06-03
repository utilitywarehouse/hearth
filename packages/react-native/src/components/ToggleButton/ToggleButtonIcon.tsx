import React, { forwardRef } from 'react';
import { Platform, type StyleProp, type ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Icon } from '../Icon';
import { IconRef } from '../../types';
import IconProps from '../Icon/Icon.props';
import { TickSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';

const ButtonIcon = forwardRef<IconRef, IconProps & { toggled: boolean }>(
  ({ children, toggled, as = TickSmallIcon, ...props }, ref) => {
    styles.useVariants({ toggled });

    return (
      <Icon
        ref={ref}
        as={as}
        {...props}
        style={
          Platform.OS === 'web'
            ? StyleSheet.compose(styles.icon as StyleProp<ViewStyle>, props.style)
            : [styles.icon as StyleProp<ViewStyle>, props.style]
        }
      >
        {children}
      </Icon>
    );
  }
);

ButtonIcon.displayName = 'ButtonIcon';

const styles = StyleSheet.create(theme => ({
  icon: {
    color: theme.components.toggleButton.foregroundColor,
    variants: {
      toggled: {
        true: {
          color: theme.components.toggleButton.selected.foregroundColor,
        },
      },
    },
  },
}));

export default ButtonIcon;
