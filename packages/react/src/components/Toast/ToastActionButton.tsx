'use client';

import { Toast as ToastPrimitive } from 'radix-ui';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ToastActionButtonProps } from './ToastActionButton.props';
import { cn } from '../../helpers/cn';
import { warn } from '../../helpers/logger';
import { InlineLink } from '../InlineLink/InlineLink';

const COMPONENT_NAME = 'ToastActionButton';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const ToastActionButton = ({
  className,
  altText,
  children,
  ...props
}: ToastActionButtonProps) => {
  warn(!altText, 'ToastActionButton: `altText` is required.');

  return (
    <ToastPrimitive.Action className={cn(componentClassName, className)} asChild altText={altText}>
      <InlineLink color="inverted" asChild>
        <button {...props}>{children}</button>
      </InlineLink>
    </ToastPrimitive.Action>
  );
};

ToastActionButton.displayName = COMPONENT_NAME;
