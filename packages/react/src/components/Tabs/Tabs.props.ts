import type { ComponentPropsWithRef } from 'react';
import { Tabs as TabsPrimitive } from 'radix-ui';
import { PropDef } from '../../props/prop-def';
import { Responsive } from '../../types/responsive';
import { FlexProps } from '../Flex/Flex.props';

const sizes = ['md', 'lg'] as const;

export const tabsPropDefs = {
  size: { className: 'size', tokens: sizes, responsive: true, default: 'md' },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
};

type RemovedProps = 'asChild' | 'dir';

export interface TabsProps extends Omit<
  ComponentPropsWithRef<typeof TabsPrimitive.Tabs>,
  RemovedProps | 'orientation'
> {
  /** Size variant */
  size?: Responsive<(typeof sizes)[number]>;
  /** Activation mode for tabs */
  activationMode?: 'automatic' | 'manual';
  spacing?: FlexProps['spacing'];
}

export type TabsListProps = Omit<
  ComponentPropsWithRef<typeof TabsPrimitive.TabsList>,
  RemovedProps
>;

export type TabProps = Omit<ComponentPropsWithRef<typeof TabsPrimitive.TabsTrigger>, RemovedProps>;

export type TabContentProps = Omit<
  ComponentPropsWithRef<typeof TabsPrimitive.TabsContent>,
  RemovedProps
>;
