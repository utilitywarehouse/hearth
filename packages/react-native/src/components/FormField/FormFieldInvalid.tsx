import { useFormFieldContext } from './FormField.context';
import { Helper } from '../Helper';
import HelperProps from '../Helper/Helper.props';
import { ErrorCircleSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';

const FormFieldInvalid = ({
  children,
  icon = ErrorCircleSmallIcon,
  text,
  ...props
}: Omit<HelperProps, 'validationStatus'>) => {
  const { validationStatus, disabled } = useFormFieldContext();
  return validationStatus === 'invalid' ? (
    children ? (
      <Helper validationStatus="invalid" showIcon disabled={disabled} {...props}>
        {children}
      </Helper>
    ) : (
      <Helper
        validationStatus="invalid"
        showIcon
        disabled={disabled}
        icon={icon}
        text={text}
        {...props}
      />
    )
  ) : null;
};

FormFieldInvalid.displayName = 'FormFieldInvalid';

export default FormFieldInvalid;
