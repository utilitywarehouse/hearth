import { Label } from '../Label';
import LabelProps from '../Label/Label.props';
import { useFormFieldContext } from './FormField.context';

const FormFieldLabel = ({ children, ...props }: Omit<LabelProps, 'disabled'>) => {
  const { disabled } = useFormFieldContext();
  return (
    <Label disabled={disabled} {...props}>
      {children}
    </Label>
  );
};

FormFieldLabel.displayName = 'FormFieldLabel';

export default FormFieldLabel;
