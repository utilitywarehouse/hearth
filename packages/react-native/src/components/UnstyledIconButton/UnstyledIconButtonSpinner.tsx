import { useMemo } from 'react';
import { Spinner } from '../Spinner';
import type { SpinnerProps } from '../Spinner';
import { useUnstyledIconButtonContext } from './UnstyledIconButton.context';
import { useTheme } from '../../hooks';
import { ColorValue } from '../../types';

const UnstyledIconButtonSpinner = ({ color, ...props }: Omit<SpinnerProps, 'size'>) => {
  const { disabled, inverted, size } = useUnstyledIconButtonContext();
  const { components } = useTheme();

  const colorValue = useMemo(() => {
    if (inverted) {
      return components.iconButton.unstyled.inverted.foregroundColor;
    }
    return components.iconButton.unstyled.foregroundColor;
  }, [inverted, components.iconButton.unstyled.foregroundColor]);

  const spinnerSize = useMemo(() => {
    if (size === 'sm') {
      return 'xs';
    }
    return 'sm';
  }, [size]);

  return (
    <Spinner
      {...props}
      aria-disabled={disabled}
      size={spinnerSize}
      color={(color as ColorValue) || colorValue}
    />
  );
};

UnstyledIconButtonSpinner.displayName = 'UnstyledIconButtonSpinner';

export default UnstyledIconButtonSpinner;
