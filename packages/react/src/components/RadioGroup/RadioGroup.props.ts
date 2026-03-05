import type { ComponentPropsWithoutRef } from 'react';
import { SizeProps } from '../../props/size.props';
import { RadioGroup as RadioGroupPrimitive } from 'radix-ui';
import { FormGroupBaseProps } from '../FormGroupBase/FormGroupBase.props';

type DivProps = Omit<ComponentPropsWithoutRef<'div'>, 'defaultValue'>;

export interface RadioGroupProps
  extends
    Omit<
      ComponentPropsWithoutRef<typeof RadioGroupPrimitive.RadioGroup>,
      'dir' | 'orientation' | keyof DivProps
    >,
    Omit<FormGroupBaseProps, 'defaultValue'> {
  /** The direction of the radios, will also set the aria-orientation value. */
  direction?: 'column' | 'row';
  /**
   * Set the container width of the RadioGroup children, independent to the width of the
   * parent RadioGroup.
   */
  contentWidth?: SizeProps['width'];
}
