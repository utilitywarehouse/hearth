import { MarginProps } from '../../props/margin.props';
import { FormFieldProps } from '../FormField/FormField.props';
import { InputBaseProps } from '../InputBase/InputBase.props';

export interface TextInputProps
  extends Omit<FormFieldProps, keyof InputBaseProps>,
    InputBaseProps,
    MarginProps {}
