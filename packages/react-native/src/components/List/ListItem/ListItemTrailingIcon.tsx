/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { ComponentType, forwardRef } from 'react';
import { Platform, type StyleProp, type ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Icon, IconProps } from '../../Icon';
import type { SvgRef } from '../../../types';

const ListItemTrailingIcon = forwardRef<SvgRef, IconProps & { as?: ComponentType }>(
  ({ children, ...props }, ref) => {
    return (
      <Icon
        ref={ref}
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

ListItemTrailingIcon.displayName = 'ListItemTrailingIcon';

const styles = StyleSheet.create(theme => ({
  icon: {
    color: theme.components.icon.color,
    width: 24,
    height: 24,
  },
}));

export default ListItemTrailingIcon;
