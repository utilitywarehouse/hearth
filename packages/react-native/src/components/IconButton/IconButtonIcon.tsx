/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { forwardRef } from 'react';
import { Platform, StyleProp, ViewStyle } from 'react-native';
import { useIconButtonContext } from './IconButton.context';
import { StyleSheet } from 'react-native-unistyles';
import { Icon } from '../Icon';
import { IconRef } from '../../types';
import IconProps from '../Icon/Icon.props';

const IconButtonIcon = forwardRef<IconRef, IconProps>(({ children, ...props }, ref) => {
  const { colorScheme, variant, inverted, disabled, size } = useIconButtonContext();
  styles.useVariants({
    colorScheme,
    variant,
    inverted,
    disabled,
    size,
  });
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

IconButtonIcon.displayName = 'IconButtonIcon';

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
      size: {
        sm: {
          width: 20,
          height: 20,
        },
        md: {
          width: 24,
          height: 24,
        },
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
        styles: {
          color: theme.components.button.outline.grey.foregroundColor,
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
        styles: {
          color: theme.components.button.outline.grey.foregroundColor,
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

export default IconButtonIcon;
