import { ToggleGroup as RadixToggleGroup } from 'radix-ui';
import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';

export interface ToggleButtonCardProps
  extends ComponentPropsWithout<typeof RadixToggleGroup.Item, RemovedProps> {
  label: string;
  'aria-labelledby': string;
}
