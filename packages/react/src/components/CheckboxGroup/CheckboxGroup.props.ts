import { SizeProps } from '../../props/size.props';
import { FormGroupBaseProps } from '../FormGroupBase/FormGroupBase.props';
import { CheckboxGroupContextValue } from './CheckboxGroup.context';

export interface CheckboxGroupProps extends FormGroupBaseProps {
  name?: string;
  required?: boolean;
  disabled?: boolean;
  defaultValue?: Array<string>;
  value?: CheckboxGroupContextValue['value'];
  onValueChange?: (value: Array<string>) => void;
  /** The direction of the checkboxes, will also set the aria-orientation value. */
  direction?: 'column' | 'row';
  /**
   * Set the container width of the CheckboxGroup children, independent to the
   * width of the  parent CheckboxGroup.
   */
  contentWidth?: SizeProps['width'];
}
