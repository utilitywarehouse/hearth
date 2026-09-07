import type { ComponentPropsWithoutRef, ComponentPropsWithRef } from 'react';
import { Toast as ToastPrimitive } from 'radix-ui';

export type ToastActionLinkProps = Omit<
  ComponentPropsWithoutRef<typeof ToastPrimitive.Action>,
  'asChild'
> &
  ComponentPropsWithRef<'a'> & {
    /**
     * Merges the link's props onto its child element instead of rendering
     * its own `a` element, so the child determines the rendered tag.
     */
    asChild?: boolean;
  };
