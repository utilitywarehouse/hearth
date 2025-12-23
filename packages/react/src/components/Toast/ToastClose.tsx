'use client';

import { Toast as RadixToast } from 'radix-ui';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ToastCloseProps } from './Toast.props';
import { cn } from '../../helpers/cn';

const COMPONENT_NAME = 'ToastClose';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const ToastClose = ({ className, ...props }: ToastCloseProps) => {
  return <RadixToast.Close className={cn(componentClassName, className)} asChild {...props} />;
};
ToastClose.displayName = COMPONENT_NAME;
