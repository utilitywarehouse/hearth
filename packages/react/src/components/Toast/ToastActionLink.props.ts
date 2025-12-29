import { Toast as ToastPrimitive } from 'radix-ui';
import { InlineLink } from '../InlineLink/InlineLink';

export type ToastActionLinkProps = Omit<
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Action>,
  'asChild'
> &
  React.ComponentPropsWithRef<typeof InlineLink>;
