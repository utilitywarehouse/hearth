import { AddSmallIcon, MinusSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { useEffect, useImperativeHandle, useRef, useState } from 'react';
import type { TextInput, TextInputFocusEvent } from 'react-native';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useFormFieldAccessibility } from '../../hooks';
import { FormField } from '../FormField';
import { InputComponent, InputField } from '../Input/Input';
import StepperButton from './StepperButton';
import StepperInputProps from './StepperInput.props';

const normalizeValue = (value?: string | number) => {
  if (value === undefined || value === null || value === '') {
    return '';
  }

  return `${value}`;
};

const getDecimalPlaces = (value?: number | string) => {
  if (value === undefined || value === null || value === '') {
    return 0;
  }

  const normalizedValue = `${value}`;
  const decimalPart = normalizedValue.split('.')[1];

  return decimalPart ? decimalPart.length : 0;
};

const formatNumber = (value: number, precision: number) => {
  if (precision <= 0) {
    return `${Math.trunc(value)}`;
  }

  return value
    .toFixed(precision)
    .replace(/\.0+$/, '')
    .replace(/(\.\d*?)0+$/, '$1');
};

const sanitizeValue = (value: string, allowNegative: boolean, allowDecimal: boolean) => {
  const strippedValue = value.replace(
    allowDecimal ? /[^\d,.-]/g : allowNegative ? /[^\d-]/g : /\D/g,
    ''
  );
  const normalizedValue = allowDecimal ? strippedValue.replace(/,/g, '.') : strippedValue;

  if (!allowNegative) {
    const unsignedValue = normalizedValue.replace(/-/g, '');

    if (!allowDecimal) {
      return unsignedValue;
    }

    const [integerPart = '', ...decimalParts] = unsignedValue.split('.');
    const decimalPart = decimalParts.join('');

    return decimalParts.length > 0 ? `${integerPart}.${decimalPart}` : integerPart;
  }

  const hasLeadingMinus = normalizedValue.startsWith('-');
  const unsignedValue = normalizedValue.replace(/-/g, '');

  if (!allowDecimal) {
    return `${hasLeadingMinus ? '-' : ''}${unsignedValue}`;
  }

  const [integerPart = '', ...decimalParts] = unsignedValue.split('.');
  const decimalPart = decimalParts.join('');
  const composedValue = decimalParts.length > 0 ? `${integerPart}.${decimalPart}` : integerPart;

  return `${hasLeadingMinus ? '-' : ''}${composedValue}`;
};

const parseValue = (value: string) => {
  if (!value || value === '-' || value === '.' || value === '-.') {
    return null;
  }

  const parsedValue = Number(value);
  return Number.isNaN(parsedValue) ? null : parsedValue;
};

const clampValue = (value: number, min?: number, max?: number) => {
  let nextValue = value;

  if (typeof min === 'number') {
    nextValue = Math.max(min, nextValue);
  }

  if (typeof max === 'number') {
    nextValue = Math.min(max, nextValue);
  }

  return nextValue;
};

const StepperInput = ({
  value,
  defaultValue,
  onChangeText,
  onChangeValue,
  min,
  max,
  step = 1,
  focusInputOnStepPress = false,
  validationStatus = 'initial',
  disabled = false,
  readonly = false,
  focused = false,
  inBottomSheet = false,
  required = true,
  label,
  labelVariant = 'body',
  helperText,
  helperIcon,
  validText,
  invalidText,
  style,
  decrementAccessibilityLabel = 'Decrease value',
  incrementAccessibilityLabel = 'Increase value',
  onFocus,
  onBlur,
  ref,
  ...props
}: StepperInputProps) => {
  const inputRef = useRef<TextInput>(null);
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(() => normalizeValue(defaultValue));
  const [isInputFocused, setIsInputFocused] = useState(false);

  const displayValue = isControlled ? normalizeValue(value) : internalValue;
  const parsedValue = parseValue(displayValue);
  const resolvedFocused = focused || isInputFocused;
  const allowNegative = typeof min !== 'number' || min < 0 || (typeof max === 'number' && max < 0);
  const decimalPrecision = Math.max(
    getDecimalPlaces(value),
    getDecimalPlaces(defaultValue),
    getDecimalPlaces(min),
    getDecimalPlaces(max),
    getDecimalPlaces(step)
  );
  const allowDecimal = decimalPrecision > 0;
  const keyboardType = allowNegative || allowDecimal ? 'numeric' : 'number-pad';
  const inputMode = allowDecimal ? 'decimal' : 'numeric';
  const { accessibilityHint, accessibilityLabel } = useFormFieldAccessibility({
    label,
    helperText,
    validText,
    invalidText,
    required,
    validationStatus,
    fallbackLabel: props.accessibilityLabel,
    fallbackHint: props.accessibilityHint,
  });

  useImperativeHandle(ref, () => inputRef.current as TextInput, []);

  useEffect(() => {
    if (!isControlled && defaultValue !== undefined) {
      setInternalValue(normalizeValue(defaultValue));
    }
  }, [defaultValue, isControlled]);

  const updateValue = (nextValue: string) => {
    if (!isControlled) {
      setInternalValue(nextValue);
    }

    onChangeText?.(nextValue);

    const nextParsedValue = parseValue(nextValue);
    if (nextParsedValue !== null) {
      onChangeValue?.(clampValue(nextParsedValue, min, max));
    }
  };

  const handleChangeText = (nextText: string) => {
    const sanitizedValue = sanitizeValue(nextText, allowNegative, allowDecimal);

    if (
      sanitizedValue === '' ||
      sanitizedValue === '-' ||
      sanitizedValue === '.' ||
      sanitizedValue === '-.' ||
      (allowDecimal && sanitizedValue.endsWith('.'))
    ) {
      updateValue(sanitizedValue);
      return;
    }

    const nextParsedValue = parseValue(sanitizedValue);

    if (nextParsedValue === null) {
      updateValue(sanitizedValue);
      return;
    }

    const clampedText = formatNumber(clampValue(nextParsedValue, min, max), decimalPrecision);
    updateValue(clampedText);
  };

  const handleStepPress = (direction: 1 | -1) => {
    const baseValue = parsedValue ?? (typeof min === 'number' ? min : 0);
    const nextValue = clampValue(baseValue + direction * step, min, max);
    const normalizedValue = formatNumber(nextValue, decimalPrecision);

    updateValue(normalizedValue);
    if (focusInputOnStepPress) {
      inputRef.current?.focus();
    }
  };

  const decrementDisabled =
    disabled || readonly || (typeof min === 'number' && parsedValue !== null && parsedValue <= min);
  const incrementDisabled =
    disabled || readonly || (typeof max === 'number' && parsedValue !== null && parsedValue >= max);

  const handleFocus = (event: TextInputFocusEvent) => {
    setIsInputFocused(true);
    onFocus?.(event);
  };

  const handleBlur = (event: TextInputFocusEvent) => {
    setIsInputFocused(false);
    onBlur?.(event);
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
      style={[styles.root, style]}
    >
      <View style={styles.controls}>
        <StepperButton
          icon={MinusSmallIcon}
          disabled={decrementDisabled}
          accessibilityLabel={decrementAccessibilityLabel}
          onPress={() => handleStepPress(-1)}
        />
        <InputComponent
          validationStatus={validationStatus}
          isInvalid={validationStatus === 'invalid'}
          isReadOnly={readonly}
          isDisabled={disabled}
          isFocused={resolvedFocused}
          isRequired={required}
          style={styles.inputRoot}
        >
          <InputField
            // @ts-expect-error - ref forwarding issue mirrors the base Input component
            ref={inputRef}
            inputMode={inputMode}
            keyboardType={keyboardType}
            inBottomSheet={inBottomSheet}
            editable={!disabled && !readonly}
            textAlign="center"
            value={displayValue}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChangeText={handleChangeText}
            accessibilityLabel={accessibilityLabel}
            accessibilityHint={accessibilityHint}
            accessibilityState={{
              ...(props.accessibilityState ?? {}),
              disabled: disabled || readonly,
            }}
            aria-disabled={disabled || readonly}
            aria-readonly={readonly}
            aria-required={required}
            aria-invalid={validationStatus === 'invalid'}
            {...props}
            style={styles.inputField}
          />
        </InputComponent>
        <StepperButton
          icon={AddSmallIcon}
          disabled={incrementDisabled}
          accessibilityLabel={incrementAccessibilityLabel}
          onPress={() => handleStepPress(1)}
        />
      </View>
    </FormField>
  );
};

StepperInput.displayName = 'StepperInput';

const styles = StyleSheet.create(theme => ({
  root: {
    width: '100%',
    maxWidth: theme.components.input.maxWidth,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.components.input.stepper.gap,
  },
  inputRoot: {
    width: 80,
    minWidth: 80,
    paddingHorizontal: 0,
    justifyContent: 'center',
  },
  inputField: {
    textAlign: 'center',
    paddingHorizontal: 0,
  },
}));

export default StepperInput;
