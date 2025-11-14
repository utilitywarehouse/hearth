import { ToggleGroup as RadixToggleGroup } from 'radix-ui';
import { ComponentPropsWithout } from '../../types/component-props';
import { FlexProps } from '../Flex/Flex.props';
import { MarginProps } from '../../props/margin.props';

export type ToggleGroupProps = ComponentPropsWithout<
  typeof RadixToggleGroup.Root,
  'asChild' | 'rovingFocus' | 'loop' | 'dir' | 'orientation' | 'disabled' | keyof FlexProps
> &
  FlexProps &
  MarginProps;
