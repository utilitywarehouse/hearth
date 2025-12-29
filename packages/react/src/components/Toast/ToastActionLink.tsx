'use client';

import { Toast as ToastPrimitive } from 'radix-ui';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ToastActionLinkProps } from './ToastActionLink.props';
import { cn } from '../../helpers/cn';
import { warn } from '../../helpers/logger';
import { InlineLink } from '../InlineLink/InlineLink';

const COMPONENT_NAME = 'ToastActionLink';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const ToastActionLink = ({ className, altText, ...props }: ToastActionLinkProps) => {
  warn(!altText, 'ToastActionLink: `altText` is required.');

  return (
    <ToastPrimitive.Action className={cn(componentClassName, className)} asChild altText={altText}>
      <InlineLink {...props} color="inverted" />
    </ToastPrimitive.Action>
  );
};

ToastActionLink.displayName = COMPONENT_NAME;
