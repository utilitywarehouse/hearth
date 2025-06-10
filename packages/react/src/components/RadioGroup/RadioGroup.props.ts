import { SizeProps } from '../../props/size.props';
import { RadioGroup as RadixRadioGroup } from 'radix-ui';
import { FormGroupBaseProps } from '../FormGroupBase/FormGroupBase.props';

export interface RadioGroupProps
  extends Omit<
      RadixRadioGroup.RadioGroupProps,
      'dir' | 'orientation' | 'disabled' | keyof FormGroupBaseProps
    >,
    FormGroupBaseProps {
  /** The direction of the radios, will also set the aria-orientation value. */
  direction?: 'column' | 'row';
  /**
   * Set the container width of the RadioGroup children, independent to the width of the
   * parent RadioGroup.
   */
  contentWidth?: SizeProps['width'];
}
