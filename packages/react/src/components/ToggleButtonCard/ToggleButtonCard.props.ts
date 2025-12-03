import { ToggleGroup as RadixToggleGroup } from 'radix-ui';
import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';
import { FlexProps } from '../Flex/Flex.props';

export type ToggleButtonCardProps = ComponentPropsWithout<
  typeof RadixToggleGroup.Item,
  RemovedProps | 'disabled'
> &
  Pick<FlexProps, 'alignItems'> & {
    label: string;
    'aria-labelledby': string;
  };
