import { SizeProps } from '../../props/size.props';
import { RadioGroup as RadioGroupPrimitive } from 'radix-ui';
import { FormGroupBaseProps } from '../FormGroupBase/FormGroupBase.props';

type SharedProps = 'defaultValue';
type DivProps = Omit<React.ComponentPropsWithoutRef<'div'>, SharedProps>;
type PrimitiveProps = Omit<
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.RadioGroup>,
  'dir' | 'orientation' | keyof DivProps
>;
type FormGroupProps = Omit<FormGroupBaseProps, SharedProps>;

export interface RadioGroupProps extends PrimitiveProps, FormGroupProps {
  /** The direction of the radios, will also set the aria-orientation value. */
  direction?: 'column' | 'row';
  /**
   * Set the container width of the RadioGroup children, independent to the width of the
   * parent RadioGroup.
   */
  contentWidth?: SizeProps['width'];
}
