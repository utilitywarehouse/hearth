import type { RadioGroupProps as RadixRadioGroupProps } from '@radix-ui/react-radio-group';
import { SizeProps } from '../../props/size.props';
import { FieldsetProps } from '../Fieldset/Fieldset.props';

export interface RadioGroupRootProps
  extends Omit<RadixRadioGroupProps, 'dir' | 'orientation' | 'disabled'> {
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
