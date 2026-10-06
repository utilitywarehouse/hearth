import { SizeProps } from '../../props/size.props';
import { FormGroupBaseProps } from '../FormGroupBase/FormGroupBase.props';
import { CheckboxGroupContextValue } from './CheckboxGroup.context';

export interface CheckboxGroupProps extends FormGroupBaseProps {
  /** The name given as data when submitted as part of a form, shared by all child `Checkbox` components. */
  name?: string;
  /** Marks the checkbox group as requiring at least one selection. */
  required?: boolean;
  /** Disables all `Checkbox` components within the group. */
  disabled?: boolean;
  /** The checked values when the group is initially rendered uncontrolled. */
  defaultValue?: Array<string>;
  /** The controlled checked values of the group. Must be used in conjunction with `onValueChange`. */
  value?: CheckboxGroupContextValue['value'];
  /** Event handler called when the checked values of the group change. */
  onValueChange?: (value: Array<string>) => void;
  /** The direction of the checkboxes, will also set the aria-orientation value. */
  direction?: 'column' | 'row';
  /**
   * Set the container width of the CheckboxGroup children, independent to the
   * width of the  parent CheckboxGroup.
   */
  contentWidth?: SizeProps['width'];
}
