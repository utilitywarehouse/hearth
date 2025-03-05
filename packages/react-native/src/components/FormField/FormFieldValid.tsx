import React, { FC } from 'react';
import { useFormFieldContext } from './FormField.context';
import { Helper } from '../Helper';
import HelperProps from '../Helper/Helper.props';
import { TickMediumContainedIcon } from '../../../docs/components/icons';

const FormFieldValid: FC<Omit<HelperProps, 'validationStatus'>> = ({
  children,
  icon = TickMediumContainedIcon,
  text,
  ...props
}) => {
  const { validationStatus, disabled } = useFormFieldContext();
  return validationStatus === 'valid' ? (
    children ? (
      <Helper validationStatus="valid" showIcon size="sm" disabled={disabled} {...props}>
        {children}
      </Helper>
    ) : (
      <Helper
        validationStatus="valid"
        disabled={disabled}
        size="sm"
        showIcon
        icon={icon}
        text={text}
        {...props}
      />
    )
  ) : null;
};

export default FormFieldValid;
