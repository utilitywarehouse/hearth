import { ToggleGroup as RadixToggleGroup } from 'radix-ui';
import { ComponentPropsWithout } from '../../types/component-props';
import { FlexProps } from '../Flex/Flex.props';

export type ToggleGroupProps = ComponentPropsWithout<
  typeof RadixToggleGroup.Root,
  'asChild' | 'rovingFocus' | 'loop' | 'dir' | 'orientation'
> &
  Omit<FlexProps, 'direction'> & {
    /** The direction of the toggle items, will also set the aria-orientation value. */
    direction?: 'column' | 'row';
  };
