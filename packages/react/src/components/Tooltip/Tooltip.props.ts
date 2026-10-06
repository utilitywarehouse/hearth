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
  /**
   * Sets the position of the tooltip relative to its trigger.
   * @default topCenter
   */
  align?:
    | 'rightCenter'
    | 'leftCenter'
    | 'bottomLeft'
    | 'bottomCenter'
    | 'bottomRight'
    | 'topLeft'
    | 'topCenter'
    | 'topRight';
  /**
   * An optional heading shown above the description for more structured tooltip content.
   */
  heading?: string;
  /**
   * The content of the tooltip.
   */
  description: ReactNode;
}
