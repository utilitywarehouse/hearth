import React, { ComponentType, forwardRef } from 'react';
import { ViewStyle } from 'react-native';
import { ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { PressableRef } from '../../types';
import { UnstyledIconButton, UnstyledIconButtonProps } from '../UnstyledIconButton';

const AlertIconButton = forwardRef<
  PressableRef,
  Omit<UnstyledIconButtonProps, 'icon'> & { icon?: ComponentType }
>(({ style, icon = ChevronRightSmallIcon, ...props }, ref) => (
  <UnstyledIconButton ref={ref} {...props} size="sm" style={style as ViewStyle} icon={icon} />
));

AlertIconButton.displayName = 'AlertIconButton';

export default AlertIconButton;
