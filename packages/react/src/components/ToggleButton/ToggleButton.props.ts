import type { ComponentPropsWithRef } from 'react';
import { ToggleGroup as ToggleGroupPrimitive } from 'radix-ui';
import type { FlexItemProps } from '../../props/flex-item.props';
import { MarginProps } from '../../props/margin.props';

export type ToggleButtonProps = Omit<
  ComponentPropsWithRef<typeof ToggleGroupPrimitive.Item>,
  'asChild' | 'disabled'
> &
  MarginProps &
  FlexItemProps;
