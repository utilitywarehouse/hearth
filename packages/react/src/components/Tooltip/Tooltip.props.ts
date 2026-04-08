import { Tooltip as TooltipPrimitive } from 'radix-ui';
import type { ComponentPropsWithRef, ReactNode } from 'react';

export interface TooltipProps
  extends Omit<
    ComponentPropsWithRef<typeof TooltipPrimitive.Content>,
    'asChild' | 'content'
  > {
  /** The content to display inside the tooltip. */
  content: ReactNode;
  /** The trigger element. */
  children: ReactNode;
  /** The open state of the tooltip (controlled). */
  open?: boolean;
  /** The default open state (uncontrolled). */
  defaultOpen?: boolean;
  /** Event handler called when the open state changes. */
  onOpenChange?: (open: boolean) => void;
  /**
   * The duration from when the pointer enters the trigger until the tooltip opens.
   * @default 700
   */
  delayDuration?: number;
}
