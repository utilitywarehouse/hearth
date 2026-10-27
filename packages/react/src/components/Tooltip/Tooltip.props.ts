import { Tooltip as TooltipPrimitive } from '@base-ui/react';
import type {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ReactElement,
  ReactNode,
} from 'react';

export interface TooltipProps
  extends
    Omit<ComponentPropsWithRef<typeof TooltipPrimitive.Popup>, 'render' | 'children' | 'className'>,
    Omit<
      ComponentPropsWithoutRef<typeof TooltipPrimitive.Root>,
      'disableHoverablePopup' | 'children'
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
  /**
   * A single element that acts as the trigger for the tooltip.
   */
  children: ReactElement;
  /** CSS class applied to the tooltip content */
  className?: string;
}
