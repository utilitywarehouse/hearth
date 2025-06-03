import React, { ComponentType, forwardRef } from 'react';
import { ViewStyle } from 'react-native';
import { CloseSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { PressableRef } from '../../types';
import { UnstyledIconButton, UnstyledIconButtonProps } from '../UnstyledIconButton';
import { StyleSheet } from 'react-native-unistyles';

const AlertCloseButton = forwardRef<
  PressableRef,
  Omit<UnstyledIconButtonProps, 'icon'> & { icon?: ComponentType }
>(({ style, icon = CloseSmallIcon, ...props }, ref) => (
  <UnstyledIconButton
    ref={ref}
    {...props}
    size="sm"
    style={[styles.icon, style as ViewStyle]}
    icon={icon}
  />
));

const styles = StyleSheet.create(theme => ({
  icon: {
    alignSelf: 'flex-start',
    color: theme.components.icon.color,
    minWidth: 20,
    minHeight: 20,
  },
}));

AlertCloseButton.displayName = 'AlertCloseButton';

export default AlertCloseButton;
