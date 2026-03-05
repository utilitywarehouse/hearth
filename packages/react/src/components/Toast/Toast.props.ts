import type { ComponentPropsWithRef, ReactNode } from 'react';
import { Toast as ToastPrimitive } from 'radix-ui';

export interface ToastProps extends Omit<
  ComponentPropsWithRef<typeof ToastPrimitive.Root>,
  'asChild' | 'forceMount'
> {
  description: ReactNode;
  icon?: ReactNode;
  showDismissButton?: boolean;
}
