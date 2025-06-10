import { SizeProps } from '../../props/size.props';
import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';
import { FieldsetProps } from '../Fieldset/Fieldset.props';
import { CheckboxGroupContextValue } from './CheckboxGroup.context';

export interface CheckboxGroupProps
  extends ComponentPropsWithout<'div', keyof FieldsetProps | RemovedProps>,
    FieldsetProps {
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
