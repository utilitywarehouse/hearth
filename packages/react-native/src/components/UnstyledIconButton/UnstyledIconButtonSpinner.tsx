import type { ComponentPropsWithoutRef, ComponentRef } from 'react';
import { forwardRef, useMemo } from 'react';
import { useTheme } from '../../hooks';
import { ColorValue } from '../../types';
import { Spinner } from '../Spinner';
import { useUnstyledIconButtonContext } from './UnstyledIconButton.context';

type SpinnerComponentProps = ComponentPropsWithoutRef<typeof Spinner>;
type UnstyledIconButtonSpinnerProps = Omit<SpinnerComponentProps, 'size'>;
type UnstyledIconButtonSpinnerRef = ComponentRef<typeof Spinner>;

const UnstyledIconButtonSpinner = forwardRef<
  UnstyledIconButtonSpinnerRef,
  UnstyledIconButtonSpinnerProps
>(({ color, ...props }, ref) => {
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
      ref={ref}
      aria-disabled={disabled}
      size={spinnerSize}
      color={(color as ColorValue) || colorValue}
    />
  );
});

UnstyledIconButtonSpinner.displayName = 'UnstyledIconButtonSpinner';

export default UnstyledIconButtonSpinner;
