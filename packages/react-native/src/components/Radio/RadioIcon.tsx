/* eslint-disable @typescript-eslint/no-unsafe-assignment  */
import React, { forwardRef } from 'react';
import { StyleSheet, Variants } from 'react-native-unistyles';
import { Icon } from '../Icon';
import { Platform } from 'react-native';
import { CircleIcon } from '../Icons';
import { useRadioContext } from './Radio.context';
import type { SvgRef } from '../../types';
import IconProps from '../Icon/Icon.props';

const RadioIcon = forwardRef<SvgRef, IconProps>(({ style, ...props }, ref) => {
  const { disabled } = useRadioContext();
  return (
    <Variants variants={{ disabled }}>
      <Icon
        ref={ref}
        as={CircleIcon}
        {...props}
        style={
          Platform.OS === 'web'
            ? { ...Object(styles.container), ...(style ? Object(style) : {}) }
            : [styles.container, style]
        }
      />
    </Variants>
  );
});

RadioIcon.displayName = 'RadioIcon';

const styles = StyleSheet.create(theme => ({
  container: {
    width: 14,
    height: 14,
    borderRadius: theme.radii.full,
    color: theme.colorMode === 'dark' ? theme.colors.cyan700 : theme.colors.cyan500,
    variants: {
      disabled: {
        true: {
          color: theme.colorMode === 'dark' ? theme.colors.grey400 : theme.colors.grey400,
        },
      },
    },
  },
}));

export default RadioIcon;
