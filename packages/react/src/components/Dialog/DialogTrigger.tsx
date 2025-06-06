import * as React from 'react';
import type { ElementRef } from 'react';
import { Dialog } from 'radix-ui';
import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';

const componentName = 'DialogTrigger';
const componentClassName = withGlobalPrefix(componentName);

type DialogTriggerElement = ElementRef<'button'>;

export const DialogTrigger = React.forwardRef<
  DialogTriggerElement,
  Omit<Dialog.DialogTriggerProps, 'asChild'>
>(({ className, ...props }, ref) => {
  return (
    <Dialog.Trigger ref={ref} className={clsx(componentClassName, className)} asChild {...props} />
  );
});

DialogTrigger.displayName = componentName;
