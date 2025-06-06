import * as React from 'react';
import type { ElementRef } from 'react';
import { Dialog as RadixDialog } from 'radix-ui';
import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';

const componentName = 'DialogClose';
const componentClassName = withGlobalPrefix(componentName);

type DialogCloseElement = ElementRef<'button'>;

export const DialogClose = React.forwardRef<
  DialogCloseElement,
  Omit<RadixDialog.DialogCloseProps, 'asChild'>
>(({ className, ...props }, ref) => {
  return (
    <RadixDialog.Close
      ref={ref}
      className={clsx(componentClassName, className)}
      asChild
      {...props}
    />
  );
});

DialogClose.displayName = componentName;
