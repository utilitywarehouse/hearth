import { Toast as ToastPrimitive } from 'radix-ui';

export interface ToastProps
  extends Omit<React.ComponentPropsWithRef<typeof ToastPrimitive.Root>, 'asChild' | 'forceMount'> {
  description: React.ReactNode;
  icon?: React.ReactNode;
  showDismissButton?: boolean;
}
