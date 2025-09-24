import * as React from 'react';
import type { ElementRef } from 'react';
import { Dialog as RadixDialog } from 'radix-ui';
import clsx from 'clsx';
import { withClassnameGlobalPrefix } from '../../helpers/with-global-prefix';

const componentName = 'ModalTrigger';
const componentClassName = withClassnameGlobalPrefix(componentName);

type ModalTriggerElement = ElementRef<'button'>;

export const ModalTrigger = React.forwardRef<
  ModalTriggerElement,
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

ModalTrigger.displayName = componentName;
