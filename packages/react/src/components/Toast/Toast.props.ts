import type { ComponentPropsWithRef, ReactNode } from 'react';
import { Toast as ToastPrimitive } from 'radix-ui';

export interface ToastProps extends Omit<
  ComponentPropsWithRef<typeof ToastPrimitive.Root>,
  'asChild' | 'forceMount'
> {
  /**
   * The content of the Toast message.
   */
  description: ReactNode;
  /**
   * An optional icon rendered before the description, such as a status icon.
   */
  icon?: ReactNode;
  /**
   * Shows a dismiss button that lets users manually close the Toast.
   */
  showDismissButton?: boolean;
}
