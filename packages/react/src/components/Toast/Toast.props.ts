import { Toast as ToastPrimitive } from 'radix-ui';

export type ToastProps = Omit<
  React.ComponentPropsWithRef<typeof ToastPrimitive.Root>,
  'asChild' | 'forceMount'
>;

export type ToastActionProps = Omit<
  React.ComponentPropsWithRef<typeof ToastPrimitive.Action>,
  'asChild'
>;

export type ToastCloseProps = Omit<
  React.ComponentPropsWithRef<typeof ToastPrimitive.Close>,
  'asChild'
>;

export type ToastDescriptionProps = Omit<
  React.ComponentPropsWithRef<typeof ToastPrimitive.Description>,
  'asChild'
>;
