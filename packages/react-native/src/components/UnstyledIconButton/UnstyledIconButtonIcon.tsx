/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { forwardRef } from 'react';
import { Platform, StyleProp, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Icon } from '../Icon';
import { IconRef } from '../../types';
import IconProps from '../Icon/Icon.props';
import { useUnstyledIconButtonContext } from './UnstyledIconButton.context';

const UnstyledIconButtonIcon = forwardRef<IconRef, IconProps>(({ children, ...props }, ref) => {
  const { active } = useUnstyledIconButtonContext();
  styles.useVariants({ active });
  return (
    <Icon
      ref={ref}
      {...props}
      style={
        Platform.OS === 'web'
          ? StyleSheet.compose(styles.icon as StyleProp<ViewStyle>, props.style)
          : [styles.icon as ViewStyle, props.style]
      }
    >
      {children}
    </Icon>
  );
});

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
    },
  },
}));

export default UnstyledIconButtonIcon;
