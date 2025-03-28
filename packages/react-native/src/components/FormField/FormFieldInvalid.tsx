import React, { FC } from 'react';
import { useFormFieldContext } from './FormField.context';
import { Helper } from '../Helper';
import HelperProps from '../Helper/Helper.props';
import { WarningMediumContainedIcon } from '@utilitywarehouse/react-native-icons';

const FormFieldInvalid: FC<Omit<HelperProps, 'validationStatus'>> = ({
  children,
  icon = WarningMediumContainedIcon,
  text,
  ...props
}) => {
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

export default FormFieldInvalid;
