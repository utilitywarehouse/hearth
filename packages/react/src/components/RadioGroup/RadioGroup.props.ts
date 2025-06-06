import { SizeProps } from '../../props/size.props';
import { FieldsetProps } from '../Fieldset/Fieldset.props';
import { RadioGroup as RadixRadioGroup } from 'radix-ui';

export interface RadioGroupRootProps
  extends Omit<RadixRadioGroup.RadioGroupProps, 'dir' | 'orientation' | 'disabled'> {
  /** The direction of the radios, will also set the aria-orientation value. */
  direction?: 'column' | 'row';
  /**
   * Set the width of the RadioGroup.
   */
  width?: SizeProps['width'];
}

export interface RadioGroupProps
  extends Omit<RadioGroupRootProps, 'width' | keyof FieldsetProps>,
    FieldsetProps,
    Pick<RadioGroupRootProps, 'defaultValue'> {
  /**
   * Set the container width of the RadioGroup children, independent to the width of the
   * parent RadioGroup.
   */
  contentWidth?: SizeProps['width'];
}
