import { ToggleGroup as ToggleGroupPrimitive } from 'radix-ui';
import { FlexProps } from '../Flex/Flex.props';
import { MarginProps } from '../../props/margin.props';

export type ToggleGroupProps = Omit<
  React.ComponentPropsWithRef<typeof ToggleGroupPrimitive.Root>,
  'asChild' | 'rovingFocus' | 'loop' | 'dir' | 'orientation' | 'disabled' | keyof FlexProps
> &
  FlexProps &
  MarginProps;
