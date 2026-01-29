import { createTextarea } from '@gluestack-ui/textarea';
import type TextareaProps from './Textarea.props';

import { useEffect } from 'react';
import { FormField, useFormFieldContext } from '../FormField';
import TextareaFieldComponent from './TextareaField';
import TextareaRoot from './TextareaRoot';

export const TextareaComponent = createTextarea({
  Root: TextareaRoot,
  Input: TextareaFieldComponent,
});

export const TextareaField = TextareaComponent.Input;

const Textarea = ({
  validationStatus = 'initial',
  children,
  disabled,
  focused,
  readonly,
  label,
  labelVariant,
  helperText,
  validText,
  invalidText,
  required,
  helperIcon,
  ...props
}: TextareaProps) => {
  const formFieldContext = useFormFieldContext();
  const textareaLabel = label ?? formFieldContext?.label;
  const textareaHelperText = helperText ?? formFieldContext?.helperText;
  const textareaValidText = validText ?? formFieldContext?.validText;
  const textareaInvalidText = invalidText ?? formFieldContext?.invalidText;
  const textareaRequired = required ?? formFieldContext?.required;
  const textareaDisabled = disabled ?? formFieldContext?.disabled;
  const textareaReadonly = readonly ?? formFieldContext?.readonly;
  const textareaValidationStatus = formFieldContext?.validationStatus ?? validationStatus;

  useEffect(() => {
    if (formFieldContext?.setShouldHandleAccessibility) {
      formFieldContext.setShouldHandleAccessibility(true);
    }
  }, []);

  const getAccessibilityLabel = () => {
    let accessibilityLabel = '';
    if (textareaLabel) {
      accessibilityLabel = accessibilityLabel + textareaLabel;
    }
    if (textareaRequired) {
      accessibilityLabel = accessibilityLabel + ', required';
    }

    return accessibilityLabel || props.accessibilityLabel;
  };

  const getAccessibilityHint = () => {
    let accessibilityHint = '';
    if (textareaHelperText) {
      accessibilityHint = accessibilityHint + textareaHelperText;
    }
    if (textareaValidationStatus !== 'initial') {
      if (accessibilityHint.length > 0) {
        accessibilityHint = accessibilityHint + ', ';
      }
      if (textareaValidationStatus === 'invalid' && textareaInvalidText) {
        accessibilityHint = accessibilityHint + textareaInvalidText;
      }
      if (textareaValidationStatus === 'valid' && textareaValidText) {
        accessibilityHint = accessibilityHint + textareaValidText;
      }
    }
    return accessibilityHint || props.accessibilityHint;
  };

  return (
    <FormField
      label={label}
      labelVariant={labelVariant}
      helperText={helperText}
      helperIcon={helperIcon}
      validText={validText}
      invalidText={invalidText}
      required={required}
      validationStatus={validationStatus}
      disabled={disabled}
      readonly={readonly}
      accessibilityHandledByChildren
    >
      <TextareaComponent
        {...(children ? props : {})}
        validationStatus={textareaValidationStatus}
        isInvalid={textareaValidationStatus === 'invalid'}
        isReadOnly={textareaReadonly}
        isDisabled={textareaDisabled}
        isFocused={focused}
        required={textareaRequired}
        aria-label={getAccessibilityLabel()}
        accessibilityHint={getAccessibilityHint()}
      >
        {children ? (
          <>{children}</>
        ) : (
          <>
            <TextareaField {...props} />
          </>
        )}
      </TextareaComponent>
    </FormField>
  );
};

export default Textarea;
