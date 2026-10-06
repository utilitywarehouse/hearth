import type { ReactNode, ComponentPropsWithRef } from 'react';
import { Collapsible as CollapsiblePrimitive } from 'radix-ui';
import type { MarginProps } from '../../props/margin.props';
import { IconContainerProps } from '../IconContainer/IconContainer.props';

export interface ExpandableCardProps
  extends
    Pick<
      ComponentPropsWithRef<typeof CollapsiblePrimitive.Root>,
      'open' | 'defaultOpen' | 'onOpenChange' | 'className'
    >,
    MarginProps {
  /**
   * The heading shown in the card's summary header, always visible regardless
   * of expanded state.
   */
  heading: string;
  /**
   * Additional helper text shown below the heading in the summary header.
   */
  helperText?: string;
  /**
   * An icon rendered to the left of the heading. Pass `aria-hidden` on the
   * icon to ensure it is not announced to screen readers.
   */
  leadingIcon?: ReactNode;
  /**
   * Wraps `leadingIcon` in a coloured `IconContainer` using the given colour
   * scheme.
   */
  leadingIconContainerColorScheme?: IconContainerProps['colorScheme'];
  /**
   * An optional badge rendered below the heading and helper text in the
   * summary header.
   */
  badge?: ReactNode;
  /**
   * A numeric value rendered on the right side of the summary header.
   */
  numericValue?: string;
  /**
   * The content revealed when the card is expanded.
   */
  children?: ReactNode;
}
