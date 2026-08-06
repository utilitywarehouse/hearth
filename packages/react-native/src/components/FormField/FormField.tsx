import { useMemo, useState } from 'react';
import { View } from 'react-native';
import { BodyText } from '../BodyText';
import { HelperIcon, HelperText } from '../Helper';
import { FormFieldContext } from './FormField.context';
import FormFieldProps from './FormField.props';
import FormFieldHelperComponent from './FormFieldHelper';
import FormFieldInvalidComponent from './FormFieldInvalid';
import FormFieldLabelComponent from './FormFieldLabel';
import FormFieldRoot from './FormFieldRoot';
import FormFieldValid from './FormFieldValid';

export const FormFieldLabel = View;
export const FormFieldLabelText = FormFieldLabelComponent;
export const FormFieldHelper = FormFieldHelperComponent;
export const FormFieldHelperText = HelperText;
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
      <FormFieldRoot {...props}>
        {(!!label || !!helperText) && (
          <FormFieldTextContent>
            {!!label && (
              <FormFieldLabelText
                variant={labelVariant}
                importantForAccessibility={shouldHandleAccessibility ? 'no' : undefined}
                accessibilityElementsHidden={shouldHandleAccessibility}
              >
                {label}
                {!required ? <BodyText weight="regular"> (Optional)</BodyText> : ''}
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
      </FormFieldRoot>
    </FormFieldContext.Provider>
  );
};

FormField.displayName = 'FormField';

export default FormField;
