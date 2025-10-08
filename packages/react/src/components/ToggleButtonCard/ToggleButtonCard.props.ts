import { ToggleGroup as RadixToggleGroup } from 'radix-ui';
import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';

export type ToggleButtonCardProps = ComponentPropsWithout<
  typeof RadixToggleGroup.Item,
  RemovedProps
> & {};
