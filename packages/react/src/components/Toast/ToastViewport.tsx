'use client';

import { Toast as RadixToast } from 'radix-ui';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ToastViewportProps } from './Toast.props';
import { cn } from '../../helpers/cn';

const COMPONENT_NAME = 'ToastViewport';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const ToastViewport = ({ className, ...props }: ToastViewportProps) => {
  return <RadixToast.Viewport className={cn(componentClassName, className)} {...props} />;
};
ToastViewport.displayName = COMPONENT_NAME;
