'use client';

import * as React from 'react';
import { Dialog as DialogPrimitive } from 'radix-ui';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ModalTriggerProps } from './Modal.props';

const COMPONENT_NAME = 'ModalTrigger';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const ModalTrigger = React.forwardRef<HTMLButtonElement, ModalTriggerProps>(
  ({ className, ...props }, ref) => {
    return (
      <DialogPrimitive.Trigger
        ref={ref}
        className={cn(componentClassName, className)}
        asChild
        {...props}
      />
    );
  }
);

ModalTrigger.displayName = COMPONENT_NAME;
