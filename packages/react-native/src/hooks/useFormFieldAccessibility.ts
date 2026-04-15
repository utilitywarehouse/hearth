import { useMemo } from 'react';

type ValidationStatus = 'initial' | 'valid' | 'invalid';

type UseFormFieldAccessibilityArgs = {
  label?: string;
  helperText?: string;
  validText?: string;
  invalidText?: string;
  required?: boolean;
  validationStatus?: ValidationStatus;
  fallbackLabel?: string;
  fallbackHint?: string;
  includeRequiredInLabel?: boolean;
};

const useFormFieldAccessibility = ({
  label,
  helperText,
  validText,
  invalidText,
  required = false,
  validationStatus = 'initial',
  fallbackLabel,
  fallbackHint,
  includeRequiredInLabel = true,
}: UseFormFieldAccessibilityArgs) => {
  const accessibilityLabel = useMemo(() => {
    const nextAccessibilityLabelParts: string[] = [];

    if (label) {
      nextAccessibilityLabelParts.push(label);
    }

    if (includeRequiredInLabel && required) {
      nextAccessibilityLabelParts.push('required');
    }

    const nextAccessibilityLabel = nextAccessibilityLabelParts.join(', ');
    return nextAccessibilityLabel || fallbackLabel;
  }, [fallbackLabel, includeRequiredInLabel, label, required]);

  const accessibilityHint = useMemo(() => {
    const accessibilityHints: string[] = [];

    if (helperText) {
      accessibilityHints.push(helperText);
    }

    if (validationStatus === 'invalid' && invalidText) {
      accessibilityHints.push(invalidText);
    }

    if (validationStatus === 'valid' && validText) {
      accessibilityHints.push(validText);
    }

    return accessibilityHints.join(', ') || fallbackHint;
  }, [fallbackHint, helperText, invalidText, validText, validationStatus]);

  return {
    accessibilityHint,
    accessibilityLabel,
  };
};

export default useFormFieldAccessibility;
