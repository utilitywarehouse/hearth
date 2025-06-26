import * as React from 'react';
import type { ElementRef } from 'react';
import { Dialog as RadixDialog } from 'radix-ui';
import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';

const componentName = 'DialogTrigger';
const componentClassName = withGlobalPrefix(componentName);

type DialogTriggerElement = ElementRef<'button'>;

export const DialogTrigger = React.forwardRef<
  DialogTriggerElement,
  Omit<RadixDialog.DialogTriggerProps, 'asChild'>
>(({ className, ...props }, ref) => {
  return (
    <RadixDialog.Trigger
      ref={ref}
      className={clsx(componentClassName, className)}
      asChild
      {...props}
    />
  );
});

DialogTrigger.displayName = componentName;
