import type { ComponentPropsWithoutRef, ComponentPropsWithRef } from 'react';
import { Toast as ToastPrimitive } from 'radix-ui';

export type ToastActionButtonProps = Omit<
  ComponentPropsWithoutRef<typeof ToastPrimitive.Action>,
  'asChild' | 'altText'
> &
  ComponentPropsWithRef<'button'> & {
    /**
     * A short description of the action for screen reader users who will
     * not be able to navigate to the button easily/quickly.
     */
    altText: string;
  };
