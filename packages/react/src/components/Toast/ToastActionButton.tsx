'use client';

import * as React from 'react';
import type { ComponentRef } from 'react';
import { Toast as ToastPrimitive } from 'radix-ui';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ToastActionButtonProps } from './ToastActionButton.props';
import { cn } from '../../helpers/cn';
import { warn } from '../../helpers/logger';
import { InlineLink } from '../InlineLink/InlineLink';

const COMPONENT_NAME = 'ToastActionButton';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type ToastActionButtonElement = ComponentRef<'button'>;

export const ToastActionButton = React.forwardRef<ToastActionButtonElement, ToastActionButtonProps>(
  ({ className, altText, children, ...props }, ref) => {
    warn(!altText, 'ToastActionButton: `altText` is required.');

    return (
      <ToastPrimitive.Action
        className={cn(componentClassName, className)}
        asChild
        altText={altText}
      >
        <InlineLink color="inverted" asChild>
          <button ref={ref} type="button" {...props}>
            {children}
          </button>
        </InlineLink>
      </ToastPrimitive.Action>
    );
  }
);

ToastActionButton.displayName = COMPONENT_NAME;
