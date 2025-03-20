import * as React from 'react';

import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import { UnstyledIconButtonProps } from './UnstyledIconButton.props';

const componentName = 'UnstyledIconButton';
const componentClassName = withGlobalPrefix(componentName);

export type UnstyledIconButtonElement = ElementRef<'button'>;

export const UnstyledIconButton = React.forwardRef<
  UnstyledIconButtonElement,
  UnstyledIconButtonProps
>(({ className, label, ...props }, forwardedRef) => {
  return (
    <button
      ref={forwardedRef}
      className={clsx(componentClassName, className)}
      aria-label={label}
      {...props}
    />
  );
});

UnstyledIconButton.displayName = componentName;
