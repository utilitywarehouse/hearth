import { RadioGroupBaseProps } from '../RadioGroupBase/RadioGroupBase.props';

export interface RadioGroupProps extends Omit<RadioGroupBaseProps, 'orientation'> {
  /** The direction of the radios, will also set the aria-orientation value. */
  direction?: 'column' | 'row';
}
