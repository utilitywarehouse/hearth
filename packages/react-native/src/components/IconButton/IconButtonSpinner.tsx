/* eslint-disable  @typescript-eslint/no-unsafe-assignment */
/* eslint-disable  react-hooks/exhaustive-deps */
import React, { forwardRef, useMemo } from 'react';
import { Spinner } from '../Spinner';
import type { SpinnerProps } from '../Spinner';
import { useIconButtonContext } from './IconButton.context';
import { View } from 'react-native';
import { useTheme } from '../../hooks';
import { ColorValue } from '../../types';

const IconButtonSpinner = forwardRef<View, Omit<SpinnerProps, 'size'>>(
  ({ color = '', ...props }, ref) => {
    const { colorScheme, variant, disabled, inverted, size } = useIconButtonContext();
    const { components, colorMode } = useTheme();
    const colorProp = useMemo(() => {
      if (variant === 'emphasis' && colorScheme === 'yellow' && inverted) {
        return components.button.emphasis.yellow.foregroundColor;
      }
      if (variant === 'emphasis' && colorScheme === 'yellow') {
        return components.button.emphasis.yellow.foregroundColor;
      }
      if (variant === 'solid' && colorScheme === 'yellow' && inverted) {
        return components.button.solid.yellow.inverted.foregroundColor;
      }
      if (variant === 'solid' && colorScheme === 'yellow') {
        return components.button.solid.yellow.foregroundColor;
      }
      if (variant === 'solid' && colorScheme === 'red') {
        return components.button.solid.red.foregroundColor;
      }
      if (variant === 'solid' && colorScheme === 'green') {
        return components.button.solid.green.foregroundColor;
      }
      if (variant === 'outline' && colorScheme === 'red') {
        return components.button.outline.red.foregroundColor;
      }
      if (variant === 'outline' && colorScheme === 'green') {
        return components.button.outline.green.foregroundColor;
      }
      if (variant === 'outline' && colorScheme === 'grey' && inverted) {
        return components.button.outline.grey.inverted.foregroundColor;
      }
      if (variant === 'outline' && colorScheme === 'grey') {
        return components.button.outline.grey.foregroundColor;
      }
      if (variant === 'ghost' && colorScheme === 'red') {
        return components.button.ghost.red.foregroundColor;
      }
      if (variant === 'ghost' && colorScheme === 'green') {
        return components.button.ghost.green.foregroundColor;
      }
      if (variant === 'ghost' && colorScheme === 'grey' && inverted) {
        return components.button.ghost.grey.inverted.foregroundColor;
      }
      if (variant === 'ghost' && colorScheme === 'grey') {
        return components.button.ghost.grey.foregroundColor;
      }
      return color;
    }, [color, colorMode, variant, inverted, colorScheme]);

    return (
      <Spinner
        ref={ref}
        {...props}
        aria-disabled={disabled}
        size={size === 'md' ? 'sm' : 'xs'}
        color={colorProp as ColorValue}
      />
    );
  }
);

IconButtonSpinner.displayName = 'IconButtonSpinner';

export default IconButtonSpinner;
