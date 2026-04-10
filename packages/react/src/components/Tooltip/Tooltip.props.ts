import { Tooltip as TooltipPrimitive } from 'radix-ui';
import type { ComponentPropsWithoutRef, ComponentPropsWithRef, ReactNode } from 'react';

export interface TooltipProps
  extends
    Omit<
      ComponentPropsWithRef<typeof TooltipPrimitive.Content>,
      | 'asChild'
      | 'content'
      | 'side'
      | 'sideOffset'
      | 'align'
      | 'alignOffset'
      | 'avoidCollisions'
      | 'collisionBoundary'
      | 'collisionPadding'
      | 'arrowPadding'
      | 'sticky'
    >,
    Omit<
      ComponentPropsWithoutRef<typeof TooltipPrimitive.Root>,
      'delayDuration' | 'disableHoverableContent'
    > {
  align?:
    | 'rightCenter'
    | 'leftCenter'
    | 'bottomLeft'
    | 'bottomCenter'
    | 'bottomRight'
    | 'topLeft'
    | 'topCenter'
    | 'topRight';
  heading?: ReactNode;
  description: ReactNode;
}
