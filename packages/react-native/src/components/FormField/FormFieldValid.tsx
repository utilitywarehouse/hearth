import React, { FC } from 'react';
import { useFormFieldContext } from './FormField.context';
import { Helper } from '../Helper';
import HelperProps from '../Helper/Helper.props';
import { TickCircleSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';

const FormFieldValid: FC<Omit<HelperProps, 'validationStatus'>> = ({
  children,
  icon = TickCircleSmallIcon,
  text,
  ...props
}) => {
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
