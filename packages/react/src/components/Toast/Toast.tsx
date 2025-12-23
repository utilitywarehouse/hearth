'use client';

import { Toast as ToastPrimitive } from 'radix-ui';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ToastProps } from './Toast.props';
import { cn } from '../../helpers/cn';

const COMPONENT_NAME = 'Toast';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const Toast = ({ className, ...props }: ToastProps) => {
  return <ToastPrimitive.Root className={cn(componentClassName, className)} {...props} />;
};
Toast.displayName = COMPONENT_NAME;
