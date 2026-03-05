import type { ComponentPropsWithoutRef, ComponentPropsWithRef } from 'react';
import { Toast as ToastPrimitive } from 'radix-ui';

export type ToastActionLinkProps = Omit<
  ComponentPropsWithoutRef<typeof ToastPrimitive.Action>,
  'asChild'
> &
  ComponentPropsWithRef<'a'>;
