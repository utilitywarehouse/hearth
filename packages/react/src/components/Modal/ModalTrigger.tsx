'use client';

import * as React from 'react';
import type { ElementRef } from 'react';
import { Dialog as RadixDialog } from 'radix-ui';
import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';

const COMPONENT_NAME = 'ModalTrigger';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

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

ModalTrigger.displayName = COMPONENT_NAME;
