import { useFormFieldContext } from './FormField.context';
import { Helper } from '../Helper';
import HelperProps from '../Helper/Helper.props';

const FormFieldHelper = ({
  children,
  icon,
  text,
  ...props
}: Omit<HelperProps, 'validationStatus'>) => {
  const { disabled } = useFormFieldContext();
  return children ? (
    <Helper disabled={disabled} {...props}>
      {children}
    </Helper>
  ) : (
    <Helper disabled={disabled} icon={icon} text={text} {...props} />
  );
};

FormFieldHelper.displayName = 'FormFieldHelper';

export default FormFieldHelper;
