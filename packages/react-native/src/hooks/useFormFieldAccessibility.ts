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
    let nextAccessibilityLabel = '';

    if (label) {
      nextAccessibilityLabel = nextAccessibilityLabel + label;
    }

    if (includeRequiredInLabel && required) {
      nextAccessibilityLabel = nextAccessibilityLabel + ', required';
    }

    return nextAccessibilityLabel || fallbackLabel;
  }, [fallbackLabel, includeRequiredInLabel, label, required]);

  const accessibilityHint = useMemo(() => {
    let nextAccessibilityHint = '';

    if (helperText) {
      nextAccessibilityHint = nextAccessibilityHint + helperText;
    }

    if (validationStatus !== 'initial') {
      if (nextAccessibilityHint.length > 0) {
        nextAccessibilityHint = nextAccessibilityHint + ', ';
      }

      if (validationStatus === 'invalid' && invalidText) {
        nextAccessibilityHint = nextAccessibilityHint + invalidText;
      }

      if (validationStatus === 'valid' && validText) {
        nextAccessibilityHint = nextAccessibilityHint + validText;
      }
    }

    return nextAccessibilityHint || fallbackHint;
  }, [fallbackHint, helperText, invalidText, validText, validationStatus]);

  return {
    accessibilityHint,
    accessibilityLabel,
  };
};

export default useFormFieldAccessibility;