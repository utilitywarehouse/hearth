import { ToggleGroup as ToggleGroupPrimitive } from 'radix-ui';
import { FlexProps } from '../Flex/Flex.props';
import { FlexItemProps } from '../../props/flex-item.props';

export type ToggleButtonCardProps = Omit<
  React.ComponentPropsWithRef<typeof ToggleGroupPrimitive.Item>,
  'disabled'
> &
  FlexItemProps &
  Pick<FlexProps, 'alignItems'> & {
    label: string;
    'aria-labelledby': string;
  };
