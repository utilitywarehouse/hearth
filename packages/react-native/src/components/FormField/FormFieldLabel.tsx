import { useFormFieldContext } from './FormField.context';
import { Label } from '../Label';
import LabelProps from '../Label/Label.props';

const FormFieldLabel = ({ children }: Omit<LabelProps, 'disabled'>) => {
  const { disabled } = useFormFieldContext();
  return <Label disabled={disabled}>{children}</Label>;
};

FormFieldLabel.displayName = 'FormFieldLabel';

export default FormFieldLabel;
