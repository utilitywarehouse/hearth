import { createFormControl } from '@gluestack-ui/form-control';
import { useMemo, useState } from 'react';
import { View } from 'react-native';
import { HelperIcon, HelperText } from '../Helper';
import { FormFieldContext } from './FormField.context';
import FormFieldProps from './FormField.props';
import FormFieldHelperComponent from './FormFieldHelper';
import {
  default as FormFieldInvalid,
  default as FormFieldInvalidComponent,
} from './FormFieldInvalid';
import FormFieldLabelComponent from './FormFieldLabel';
import FormFieldRoot from './FormFieldRoot';
import FormFieldValid from './FormFieldValid';
import FormFieldInvalidIcon from './FormFielInvalidIcon';

export const FormFieldComponent = createFormControl({
  Root: FormFieldRoot,
  Error: FormFieldInvalidComponent,
  ErrorText: FormFieldInvalid,
  ErrorIcon: FormFieldInvalidIcon,
  Label: () => null,
  LabelText: FormFieldLabelComponent,
  LabelAstrick: () => null,
  Helper: FormFieldHelperComponent,
  HelperText: HelperText,
});

export const FormFieldLabel = FormFieldComponent.Label;
export const FormFieldLabelText = FormFieldComponent.Label.Text;
export const FormFieldHelper = FormFieldComponent.Helper;
export const FormFieldHelperText = FormFieldComponent.Helper.Text;
export const FormFieldHelperIcon = HelperIcon;
export const FormFieldValidText = HelperText;
export const FormFieldInvalidText = HelperText;
export const FormFieldTextContent = View;

const FormField = ({
  children,
  disabled,
  validationStatus = 'initial',
  readonly,
  label,
  helperText,
  helperIcon,
  validText,
  invalidText,
  required = true,
  labelVariant = 'body',
  accessibilityHandledByChildren = false,
  ...props
}: FormFieldProps) => {
  const [shouldHandleAccessibility, setShouldHandleAccessibility] = useState<boolean>(
    accessibilityHandledByChildren
  );
  const value = useMemo(
    () => ({
      validationStatus,
      disabled,
      readonly,
      required,
      label,
      helperText,
      helperIcon,
      validText,
      invalidText,
      setShouldHandleAccessibility,
      shouldHandleAccessibility,
    }),
    [
      validationStatus,
      disabled,
      readonly,
      required,
      label,
      helperText,
      helperIcon,
      validText,
      invalidText,
      setShouldHandleAccessibility,
      shouldHandleAccessibility,
    ]
  );

  return (
    <FormFieldContext.Provider value={value}>
      <FormFieldComponent {...props} isDisabled={disabled} isReadOnly={readonly}>
        {(!!label || !!helperText) && (
          <FormFieldTextContent>
            {!!label && (
              <FormFieldLabelText
                variant={labelVariant}
                importantForAccessibility={shouldHandleAccessibility ? 'no' : undefined}
                accessibilityElementsHidden={shouldHandleAccessibility}
              >
                {label}
                {!required ? ` (Optional)` : ''}
              </FormFieldLabelText>
            )}
            {!!helperText && (
              <FormFieldHelper
                text={helperText}
                icon={helperIcon}
                showIcon={!!helperIcon}
                importantForAccessibility={shouldHandleAccessibility ? 'no' : undefined}
                accessibilityElementsHidden={shouldHandleAccessibility}
              />
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

FormField.displayName = 'FormField';

export default FormField;
