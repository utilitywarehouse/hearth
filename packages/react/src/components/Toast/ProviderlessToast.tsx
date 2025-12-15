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

export interface ProviderlessToastProps extends Omit<ToastProps, 'open' | 'onOpenChange'> {
  children: ReactNode;
  action?: ReactNode;
  closeButton?: ReactNode;
  isOpen?: boolean;
  onIsOpenChange?: (open: boolean) => void;
  duration?: number;
  swipeDirection?: 'up' | 'down' | 'left' | 'right';
}

export const ProviderlessToast: FC<ProviderlessToastProps> = ({
  children,
  action,
  closeButton,
  isOpen = false,
  onIsOpenChange,
  duration = 6000,
  swipeDirection = 'down',
  ...toastProps
}) => {
  return (
    <ToastProvider duration={duration} swipeDirection={swipeDirection}>
      <Toast open={isOpen} onOpenChange={onIsOpenChange} {...toastProps}>
        <ToastDescription>{children}</ToastDescription>
        {action && <ToastAction altText="Action">{action}</ToastAction>}
        {closeButton && <ToastClose>{closeButton}</ToastClose>}
      </Toast>
      <ToastViewport />
    </ToastProvider>
  );
};

ProviderlessToast.displayName = 'ProviderlessToast';
