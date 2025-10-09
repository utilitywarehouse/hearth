import { ToggleGroup as RadixToggleGroup } from 'radix-ui';
import { ComponentPropsWithout } from '../../types/component-props';
import { FlexProps } from '../Flex/Flex.props';
import { MarginProps } from '../../props/margin.props';

export interface ToggleGroupProps
  extends ComponentPropsWithout<
      typeof RadixToggleGroup.Root,
      'asChild' | 'rovingFocus' | 'loop' | 'dir' | 'orientation' | keyof FlexProps
    >,
    Omit<FlexProps, 'direction'>,
    MarginProps {
  /** The direction of the toggle items, will also set the aria-orientation value. */
  direction?: 'column' | 'row';
}
