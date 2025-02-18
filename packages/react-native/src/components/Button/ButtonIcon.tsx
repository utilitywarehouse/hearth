/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { forwardRef } from 'react';
import { Platform, type StyleProp, type ViewStyle } from 'react-native';
import { useButtonContext } from './Button.context';
import { StyleSheet } from 'react-native-unistyles';
import { Icon } from '../Icon';
import { IconRef } from '../../types';
import IconProps from '../Icon/Icon.props';

const ButtonIcon = forwardRef<IconRef, IconProps>(({ children, ...props }, ref) => {
  const { colorScheme, variant, inverted, disabled } = useButtonContext();
  styles.useVariants({ colorScheme, variant, inverted, disabled });

  return (
    <Icon ref={ref} {...props} style={[styles.icon as StyleProp<ViewStyle>, props.style]}>
      {children}
    </Icon>
  );
});

ButtonIcon.displayName = 'ButtonIcon';

const styles = StyleSheet.create(theme => ({
  icon: {
    variants: {
      variant: {
        emphasis: {},
        solid: {},
        outline: {},
        ghost: {},
      },
      colorScheme: {
        yellow: {},
        red: {},
        green: {},
        grey: {},
      },
      inverted: {
        true: {},
      },
      disabled: {
        true: {},
      },
    },
    compoundVariants: [
      {
        variant: 'emphasis',
        colorScheme: 'yellow',
        styles: {
          color: theme.components.button.emphasis.yellow.foregroundColor,
        },
      },
      {
        variant: 'solid',
        colorScheme: 'yellow',
        styles: {
          color: theme.components.button.solid.yellow.foregroundColor,
        },
      },
      {
        variant: 'solid',
        colorScheme: 'red',
        styles: {
          color: theme.components.button.solid.red.foregroundColor,
        },
      },
      {
        variant: 'solid',
        colorScheme: 'green',
        styles: {
          color: theme.components.button.solid.green.foregroundColor,
        },
      },
      {
        variant: 'outline',
        colorScheme: 'red',
        styles: {
          color: theme.components.button.outline.red.foregroundColor,
        },
      },
      {
        variant: 'outline',
        colorScheme: 'green',
        styles: {
          color: theme.components.button.outline.green.foregroundColor,
        },
      },
      {
        variant: 'outline',
        colorScheme: 'grey',
        inverted: true,
        styles: {
          color: theme.components.button.outline.grey.inverted.foregroundColor,
        },
      },
      {
        variant: 'ghost',
        colorScheme: 'red',
        styles: {
          color: theme.components.button.ghost.red.foregroundColor,
        },
      },
      {
        variant: 'ghost',
        colorScheme: 'green',
        styles: {
          color: theme.components.button.ghost.green.foregroundColor,
        },
      },
      {
        variant: 'ghost',
        colorScheme: 'grey',
        inverted: true,
        styles: {
          color: theme.components.button.outline.grey.inverted.foregroundColor,
        },
      },
    ],
  },
}));

export default ButtonIcon;
