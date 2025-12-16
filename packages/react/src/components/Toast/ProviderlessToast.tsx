'use client';

import * as React from 'react';
import type { FC, ReactNode } from 'react';
import {
  Toast,
  ToastProvider,
  ToastViewport,
  ToastDescription,
  ToastAction,
  ToastClose,
} from './Toast';
import type { ToastProps } from './Toast.props';

export interface ProviderlessToastProps extends ToastProps {
  children: ReactNode;
  action?: ReactNode;
  closeButton?: ReactNode;
  duration?: number;
  swipeDirection?: 'up' | 'down' | 'left' | 'right';
}

export const ProviderlessToast: FC<ProviderlessToastProps> = ({
  children,
  action,
  closeButton,
  open = false,
  onOpenChange,
  duration = 6000,
  swipeDirection = 'down',
  ...toastProps
}) => {
  return (
    <ToastProvider duration={duration} swipeDirection={swipeDirection}>
      <Toast open={open} onOpenChange={onOpenChange} {...toastProps}>
        <ToastDescription>{children}</ToastDescription>
        {action && <ToastAction altText="Action">{action}</ToastAction>}
        {closeButton && <ToastClose>{closeButton}</ToastClose>}
      </Toast>
      <ToastViewport />
    </ToastProvider>
  );
};

ProviderlessToast.displayName = 'ProviderlessToast';
