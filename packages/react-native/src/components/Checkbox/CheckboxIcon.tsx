import React, { forwardRef } from 'react';
import { Icon } from '../Icon';
import type { SvgRef } from '../../types';
import { TickSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import IconProps from '../Icon/Icon.props';
import { StyleSheet } from 'react-native-unistyles';
import { Platform, ViewStyle } from 'react-native';

const CheckboxIcon = forwardRef<SvgRef, IconProps>(({ style, ...props }, ref) => {
  return (
    <Icon
      ref={ref}
      as={TickSmallIcon}
      {...props}
      style={
        Platform.OS === 'web'
          ? StyleSheet.compose(styles.icon, style)
          : [styles.icon as ViewStyle, style]
      }
    />
  );
});

const styles = StyleSheet.create(theme => ({
  icon: {
    color: theme.components.checkbox.checked.iconColor,
  },
}));

CheckboxIcon.displayName = 'CheckboxIcon';

export default CheckboxIcon;
