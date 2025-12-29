import { Toast as ToastPrimitive } from 'radix-ui';

export type ToastActionButtonProps = Omit<
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Action>,
  'asChild'
> &
  React.ComponentPropsWithRef<'button'>;
