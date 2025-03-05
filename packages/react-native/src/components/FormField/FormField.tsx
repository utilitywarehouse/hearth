import React, { FC, useMemo } from 'react';
import { createFormControl } from '@gluestack-ui/form-control';
import { FormFieldContext } from './FormField.context';
import FormFieldProps from './FormField.props';
import FormFieldRoot from './FormFieldRoot';
import FormFieldInvalidComponent from './FormFieldInvalid';
import FormFieldHelperComponent from './FormFieldHelper';
import FormFieldLabelComponent from './FormFieldLabel';
import { HelperIcon, HelperText } from '../Helper';
import { View } from 'react-native';
import FormFieldValid from './FormFieldValid';
import FormFieldValidIcon from './FormFieldValidIcon';
import FormFieldInvalid from './FormFieldInvalid';
import FormFieldInvalidIcon from './FormFielInvalidIcon';

export const FormFieldComponent = createFormControl({
  Root: FormFieldRoot,
  Error: FormFieldInvalidComponent,
  ErrorText: FormFieldInvalid,
  ErrorIcon: FormFieldInvalidIcon,
  Label: View,
  LabelText: FormFieldLabelComponent,
  LabelAstrick: View,
  Helper: FormFieldHelperComponent,
  HelperText: HelperText,
});

export const FormFieldLabel = FormFieldComponent.Label;
export const FormFieldLabelText = FormFieldComponent.Label.Text;
export const FormFieldHelper = FormFieldComponent.Helper;
export const FormFieldHelperText = FormFieldComponent.Helper.Text;
export const FormFieldHelperIcon = FormFieldValidIcon;
export const FormFieldValidText = FormFieldValid;
export const FormFieldInvalidText = FormFieldInvalid;
export const FormFieldTextContent = View;

const FormField: FC<FormFieldProps> = ({
  children,
  disabled,
  validationStatus = 'initial',
  readonly,
  label,
  helperText,
  helperIcon,
  validText,
  invalidText,
  ...props
}) => {
  const value = useMemo(
    () => ({
      validationStatus,
      disabled,
      readonly,
    }),
    [validationStatus, disabled, readonly]
  );

  return (
    <FormFieldContext.Provider value={value}>
      <FormFieldComponent {...props} isDisabled={disabled} isReadOnly={readonly}>
        {(!!label || !!helperText) && (
          <FormFieldTextContent>
            {!!label && <FormFieldLabelText>{label}</FormFieldLabelText>}
            {!!helperText && (
              <FormFieldHelper text={helperText} icon={helperIcon} showIcon={!!helperIcon} />
            )}
          </FormFieldTextContent>
        )}
        {children}

        {!!validText && <FormFieldValid text={validText} />}
        {!!invalidText && <FormFieldInvalidComponent text={invalidText} />}
      </FormFieldComponent>
    </FormFieldContext.Provider>
  );
};

export default FormField;
