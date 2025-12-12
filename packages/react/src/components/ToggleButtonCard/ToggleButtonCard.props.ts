import { ToggleGroup as ToggleGroupPrimitive } from 'radix-ui';
import { FlexProps } from '../Flex/Flex.props';

export type ToggleButtonCardProps = Omit<
  React.ComponentPropsWithRef<typeof ToggleGroupPrimitive.Item>,
  'disabled'
> &
  Pick<FlexProps, 'alignItems'> & {
    label: string;
    'aria-labelledby': string;
  };
