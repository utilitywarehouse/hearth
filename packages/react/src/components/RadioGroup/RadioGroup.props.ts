import type { ComponentPropsWithoutRef } from 'react';
import { SizeProps } from '../../props/size.props';
import { RadioGroup as RadioGroupPrimitive } from 'radix-ui';
import { FormGroupBaseProps } from '../FormGroupBase/FormGroupBase.props';
import { FlexProps } from '../Flex/Flex.props';

type DivProps = Omit<ComponentPropsWithoutRef<'div'>, 'defaultValue'>;

export interface RadioGroupProps
  extends
    Omit<
      ComponentPropsWithoutRef<typeof RadioGroupPrimitive.RadioGroup>,
      'dir' | 'orientation' | keyof DivProps
    >,
    Omit<FormGroupBaseProps, 'defaultValue'> {
  /**
   * Merges the component's props onto its immediate child instead of
   * rendering its own DOM element, so the child determines the rendered tag.
   *
   * @default false
   */
  asChild?: boolean;
  /**
   * The layout direction of the radio items within the group.
   * @default column
   */
  direction?: FlexProps['direction'];
  /**
   * Set the container width of the RadioGroup children, independent to the width of the
   * parent RadioGroup.
   */
  contentWidth?: SizeProps['width'];
}
