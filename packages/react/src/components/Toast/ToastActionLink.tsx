'use client';

import { forwardRef } from 'react';
import type { ComponentRef } from 'react';
import { Toast as ToastPrimitive } from 'radix-ui';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ToastActionLinkProps } from './ToastActionLink.props';
import { cn } from '../../helpers/cn';
import { warn } from '../../helpers/logger';
import { InlineLink } from '../InlineLink/InlineLink';

const COMPONENT_NAME = 'ToastActionLink';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type ToastActionLinkElement = ComponentRef<'a'>;

export const ToastActionLink = forwardRef<ToastActionLinkElement, ToastActionLinkProps>(
  ({ className, altText, asChild, children, ...props }, ref) => {
    warn(!altText, 'ToastActionLink: `altText` is required.');

    return (
      <ToastPrimitive.Action
        className={cn(componentClassName, className)}
        asChild
        altText={altText}
      >
        <InlineLink ref={ref} {...props} color="inverted" asChild={asChild}>
          {children}
        </InlineLink>
      </ToastPrimitive.Action>
    );
  }
);

ToastActionLink.displayName = COMPONENT_NAME;
