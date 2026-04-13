import { AddSmallIcon, MinusSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import type { TextInput, TextInputFocusEvent } from 'react-native';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { FormField } from '../FormField';
import { InputComponent, InputField } from '../Input/Input';
import StepperButton from './StepperButton';
import type StepperInputProps from './StepperInput.props';

const normalizeValue = (value?: string | number) => {
  if (value === undefined || value === null || value === '') {
    return '';
  }

  return `${value}`;
};

const sanitizeValue = (value: string, allowNegative: boolean) => {
  const strippedValue = value.replace(allowNegative ? /[^\d-]/g : /\D/g, '');

  if (!allowNegative) {
    return strippedValue;
  }

  const hasLeadingMinus = strippedValue.startsWith('-');
  const numericValue = strippedValue.replace(/-/g, '');

  return `${hasLeadingMinus ? '-' : ''}${numericValue}`;
};

const parseValue = (value: string) => {
  if (!value || value === '-') {
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

const StepperInput = forwardRef<TextInput, StepperInputProps>(
  (
    {
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
      ...props
    },
    ref
  ) => {
    const inputRef = useRef<TextInput>(null);
    const isControlled = value !== undefined;
    const allowNegative = typeof min === 'number' && min < 0;
    const [internalValue, setInternalValue] = useState(() => normalizeValue(defaultValue));
    const [isInputFocused, setIsInputFocused] = useState(false);

    const displayValue = isControlled ? normalizeValue(value) : internalValue;
    const parsedValue = parseValue(displayValue);
    const resolvedFocused = focused || isInputFocused;

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
      const sanitizedValue = sanitizeValue(nextText, allowNegative);
      const nextParsedValue = parseValue(sanitizedValue);

      if (nextParsedValue === null) {
        updateValue(sanitizedValue);
        return;
      }

      const clampedText = `${clampValue(nextParsedValue, min, max)}`;
      updateValue(clampedText);
    };

    const handleStepPress = (direction: 1 | -1) => {
      const baseValue = parsedValue ?? (typeof min === 'number' ? min : 0);
      const nextValue = clampValue(baseValue + direction * step, min, max);
      const normalizedValue = `${nextValue}`;

      updateValue(normalizedValue);
      if (focusInputOnStepPress) {
        inputRef.current?.focus();
      }
    };

    const decrementDisabled =
      disabled ||
      readonly ||
      (typeof min === 'number' && parsedValue !== null && parsedValue <= min);
    const incrementDisabled =
      disabled ||
      readonly ||
      (typeof max === 'number' && parsedValue !== null && parsedValue >= max);

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
              inputMode="numeric"
              keyboardType="number-pad"
              inBottomSheet={inBottomSheet}
              editable={!disabled && !readonly}
              textAlign="center"
              value={displayValue}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChangeText={handleChangeText}
              accessibilityLabel={label}
              accessibilityHint={helperText}
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
  }
);

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
