import { Toast as ToastPrimitive } from 'radix-ui';

export type ToastActionLinkProps = Omit<
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Action>,
  'asChild'
> &
  React.ComponentPropsWithRef<'a'>;
