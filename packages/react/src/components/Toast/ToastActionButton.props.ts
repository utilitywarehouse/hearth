import type { ComponentPropsWithoutRef, ComponentPropsWithRef } from 'react';
import { Toast as ToastPrimitive } from 'radix-ui';

export type ToastActionButtonProps = Omit<
  ComponentPropsWithoutRef<typeof ToastPrimitive.Action>,
  'asChild'
> &
  ComponentPropsWithRef<'button'>;
