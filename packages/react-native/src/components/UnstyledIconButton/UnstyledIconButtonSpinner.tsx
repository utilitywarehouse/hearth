import { useMemo } from 'react';
import { useTheme } from '../../hooks';
import { ColorValue } from '../../types';
import type { SpinnerProps } from '../Spinner';
import { Spinner } from '../Spinner';
import { useUnstyledIconButtonContext } from './UnstyledIconButton.context';

const UnstyledIconButtonSpinner = ({ color, ...props }: Omit<SpinnerProps, 'size'>) => {
  const { disabled, inverted, size } = useUnstyledIconButtonContext();
  const { components } = useTheme();

  const colorValue = useMemo(() => {
    if (inverted) {
      return components.iconButton.unstyled.inverted.foregroundColor;
    }
    return components.iconButton.unstyled.foregroundColor;
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
