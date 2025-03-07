/* eslint-disable  @typescript-eslint/no-unsafe-assignment */
/* eslint-disable  react-hooks/exhaustive-deps */
import React, { forwardRef, useMemo } from 'react';
import { Spinner } from '../Spinner';
import type { SpinnerProps } from '../Spinner';
import { useUnstyledIconButtonContext } from './UnstyledIconButton.context';
import { View } from 'react-native';
import { useTheme } from '../../hooks';

const UnstyledIconButtonSpinner = forwardRef<View, Omit<SpinnerProps, 'size'>>(
  ({ color = '', ...props }, ref) => {
    const { disabled } = useUnstyledIconButtonContext();
    const { components } = useTheme();

    return (
      <Spinner
        ref={ref}
        {...props}
        aria-disabled={disabled}
        size="sm"
        color={components.iconButton.unstyled.foregroundColor}
      />
    );
  }
);

UnstyledIconButtonSpinner.displayName = 'UnstyledIconButtonSpinner';

export default UnstyledIconButtonSpinner;
