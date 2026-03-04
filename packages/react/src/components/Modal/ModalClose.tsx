'use client';

import * as React from 'react';
import type { ComponentRef } from 'react';
import { Dialog as DialogPrimitive } from 'radix-ui';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ModalCloseProps } from './Modal.props';

const COMPONENT_NAME = 'ModalClose';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type ModalCloseElement = ComponentRef<'button'>;

export const ModalClose = React.forwardRef<ModalCloseElement, ModalCloseProps>(
  ({ className, ...props }, ref) => {
    return (
      <DialogPrimitive.Close
        ref={ref}
        className={cn(componentClassName, className)}
        asChild
        {...props}
      />
    );
  }
);

ModalClose.displayName = COMPONENT_NAME;
