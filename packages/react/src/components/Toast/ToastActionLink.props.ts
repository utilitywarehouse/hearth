import type { ComponentPropsWithoutRef, ComponentPropsWithRef } from 'react';
import { Toast as ToastPrimitive } from 'radix-ui';

export type ToastActionLinkProps = ComponentPropsWithoutRef<typeof ToastPrimitive.Action> &
  ComponentPropsWithRef<'a'>;
