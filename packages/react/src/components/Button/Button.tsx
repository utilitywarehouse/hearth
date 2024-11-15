import * as React from 'react';

import clsx from 'clsx';
import { ButtonProps } from './Button.props';
import { ButtonBase } from '../ButtonBase/ButtonBase';
import { withBreakpoints } from '../BodyText/with-breakpoints';

const componentName = 'Button';
const componentClassName = 'uwp-' + componentName;

export const Button = React.forwardRef<
  React.ElementRef<'button'>,
  React.PropsWithChildren<ButtonProps>
>(function Button({ className, size = 'medium', ...props }, forwardedRef) {
  const sizeClassName = withBreakpoints(size, 'size');
  return (
    <ButtonBase
      ref={forwardedRef}
      className={clsx(componentClassName, sizeClassName, className)}
      {...props}
    />
  );
});

Button.displayName = componentName;
