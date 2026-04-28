import type { ReactNode, ComponentPropsWithRef } from 'react';
import { Collapsible } from 'radix-ui';
import type { MarginProps } from '../../props/margin.props';

type CollapsibleRootProps = ComponentPropsWithRef<typeof Collapsible.Root>;

export interface ExpandableCardProps
  extends
    MarginProps,
    Pick<CollapsibleRootProps, 'open' | 'defaultOpen' | 'onOpenChange' | 'disabled' | 'className'> {
  heading: string;
  helperText?: string;
  leadingContent?: ReactNode;
  children?: ReactNode;
}
