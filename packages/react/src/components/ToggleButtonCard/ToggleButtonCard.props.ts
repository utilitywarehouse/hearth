import type { ComponentPropsWithRef } from 'react';
import { ToggleGroup as ToggleGroupPrimitive } from 'radix-ui';
import { FlexProps } from '../Flex/Flex.props';
import { FlexItemProps } from '../../props/flex-item.props';
import { MarginProps } from '../../props/margin.props';

export type ToggleButtonCardProps = Omit<
  ComponentPropsWithRef<typeof ToggleGroupPrimitive.Item>,
  'asChild' | 'disabled'
> &
  MarginProps &
  FlexItemProps &
  FlexProps & {
    label: string;
    'aria-labelledby': string;
  };
