import type { ComponentPropsWithRef } from 'react';
import { ToggleGroup as ToggleGroupPrimitive } from 'radix-ui';
import type { FlexItemProps } from '../../props/flex-item.props';

export type ToggleButtonProps = Omit<
  ComponentPropsWithRef<typeof ToggleGroupPrimitive.Item>,
  'disabled'
> &
  FlexItemProps;
