import { TickCircleSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { Helper } from '../Helper';
import HelperProps from '../Helper/Helper.props';
import { useFormFieldContext } from './FormField.context';

const FormFieldValid = ({
  children,
  icon = TickCircleSmallIcon,
  text,
  ...props
}: Omit<HelperProps, 'validationStatus'>) => {
  const { validationStatus, disabled } = useFormFieldContext();
  return validationStatus === 'valid' ? (
    children ? (
      <Helper validationStatus="valid" showIcon disabled={disabled} {...props}>
        {children}
      </Helper>
    ) : (
      <Helper
        validationStatus="valid"
        disabled={disabled}
        showIcon
        icon={icon}
        text={text}
        {...props}
      />
    )
  ) : null;
};

FormFieldValid.displayName = 'FormFieldValid';

export default FormFieldValid;
