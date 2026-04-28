import type { ReactNode, ComponentPropsWithRef } from 'react';
import { Collapsible as CollapsiblePrimitive } from 'radix-ui';
import type { MarginProps } from '../../props/margin.props';
import { IconContainerProps } from '../IconContainer/IconContainer.props';

export interface ExpandableCardProps
  extends
    Pick<
      ComponentPropsWithRef<typeof CollapsiblePrimitive.Root>,
      'open' | 'defaultOpen' | 'onOpenChange' | 'disabled' | 'className'
    >,
    MarginProps {
  heading: string;
  helperText?: string;
  leadingIcon?: ReactNode;
  leadingIconContainerColorScheme?: IconContainerProps['colorScheme'];
  badge?: ReactNode;
  numericValue?: string;
  children?: ReactNode;
}
