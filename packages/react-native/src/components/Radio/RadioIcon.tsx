/* eslint-disable @typescript-eslint/no-unsafe-assignment  */
import React, { forwardRef } from 'react';
import { StyleSheet } from 'react-native-unistyles';
import { Icon } from '../Icon';
import { CircleIcon } from '../Icons';
import type { SvgRef } from '../../types';
import IconProps from '../Icon/Icon.props';
import { Platform } from 'react-native';

const RadioIcon = forwardRef<SvgRef, IconProps>(({ style, ...props }, ref) => {
  return (
    <Icon
      ref={ref}
      as={CircleIcon}
      {...props}
      style={
        Platform.OS === 'web'
          ? StyleSheet.compose(styles.container, style)
          : [styles.container, style]
      }
    />
  );
});

RadioIcon.displayName = 'RadioIcon';

const styles = StyleSheet.create(theme => ({
  container: {
    width: 14,
    height: 14,
    borderRadius: theme.borderRadius.full,
    color: theme.components.radio.checked.color,
  },
}));

export default RadioIcon;
