import type { ComponentPropsWithRef } from 'react';
import { ToggleGroup as ToggleGroupPrimitive } from 'radix-ui';
import { FlexProps } from '../Flex/Flex.props';
import { FlexItemProps } from '../../props/flex-item.props';

export type ToggleButtonCardProps = Omit<
  ComponentPropsWithRef<typeof ToggleGroupPrimitive.Item>,
  'disabled'
> &
  FlexItemProps &
  FlexProps & {
    label: string;
    'aria-labelledby': string;
  };
