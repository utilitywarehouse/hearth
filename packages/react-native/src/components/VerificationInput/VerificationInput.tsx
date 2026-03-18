import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { TextInput, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { FormField } from '../FormField';
import type { VerificationInputHandle, VerificationInputProps } from './VerificationInput.props';
import { getNextIndexFromValueChange } from './VerificationInput.utils';
import { VerificationInputSlot } from './VerificationInputSlot';

const VerificationInput = forwardRef<VerificationInputHandle, VerificationInputProps>(
  (
    {
      value = '',
      onChangeText,
      label,
      labelVariant = 'body',
      helperText,
      helperIcon,
      validationStatus = 'initial',
      validText,
      invalidText,
      disabled = false,
      readonly = false,
      secureTextEntry = false,
      autoFocus = false,
      style,
      testID,
      ...props
    },
    ref
  ) => {
    const length = 6;
    const inputRef = useRef<TextInput>(null);
    const latestValueRef = useRef(value);
    const [displayValue, setDisplayValue] = useState(value);
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
    const [selection, setSelection] = useState({ start: 0, end: 0 });
    const latestSelectionRef = useRef(selection);
    const ignoreNextSelectionRef = useRef(false);
    const pendingFocusIndexRef = useRef<number | null>(null);

    useEffect(() => {
      if (value !== latestValueRef.current) {
        const trimmedValue = value.slice(0, length);
        latestValueRef.current = trimmedValue;
        setDisplayValue(trimmedValue);
        const nextPos = Math.min(trimmedValue.length, length);
        const nextSelection = { start: nextPos, end: nextPos };
        ignoreNextSelectionRef.current = true;
        latestSelectionRef.current = nextSelection;
        setSelection(nextSelection);
      }
    }, [length, value]);

    const updateValue = useCallback(
      (nextValue: string) => {
        const trimmedValue = nextValue.slice(0, length);
        latestValueRef.current = trimmedValue;
        setDisplayValue(trimmedValue);
        onChangeText?.(trimmedValue);
      },
      [length, onChangeText]
    );

    const setSelectionIndex = (index: number) => {
      const clampedIndex = Math.max(0, Math.min(index, length));
      const hasChar = !!latestValueRef.current[clampedIndex];
      const endIndex = hasChar ? Math.min(clampedIndex + 1, length) : clampedIndex;
      const nextSelection = { start: clampedIndex, end: endIndex };
      ignoreNextSelectionRef.current = true;
      latestSelectionRef.current = nextSelection;
      setSelection(nextSelection);
      setFocusedIndex(Math.min(clampedIndex, length - 1));
    };

    const setCaretIndex = (index: number) => {
      const clampedIndex = Math.max(0, Math.min(index, length));
      const nextSelection = { start: clampedIndex, end: clampedIndex };
      ignoreNextSelectionRef.current = true;
      latestSelectionRef.current = nextSelection;
      setSelection(nextSelection);
      setFocusedIndex(Math.min(clampedIndex, length - 1));
    };

    const handleChangeText = (text: string) => {
      const prevValue = latestValueRef.current;
      const nextValue = text.slice(0, length);
      const prevLength = prevValue.length;
      const nextLength = nextValue.length;
      const diff = nextLength - prevLength;
      const isBulkInsert = text.length > 1 && diff > 1;
      const shouldBlur = nextLength >= length;
      const nextIndex = getNextIndexFromValueChange({ prevValue, nextValue, length });
      updateValue(nextValue);
      if (isBulkInsert) {
        setCaretIndex(Math.min(nextLength, length));
        if (shouldBlur) {
          inputRef.current?.blur();
        }
        return;
      }
      if (nextIndex >= length) {
        setCaretIndex(nextIndex);
        if (shouldBlur) {
          inputRef.current?.blur();
        }
        return;
      }

      if (nextLength >= length) {
        setSelectionIndex(nextIndex);
        inputRef.current?.blur();
        return;
      }

      const hasNextChar = !!nextValue[nextIndex];
      if (hasNextChar) {
        setSelectionIndex(nextIndex);
      } else {
        setCaretIndex(nextIndex);
      }
    };

    const handleFocus = () => {
      if (pendingFocusIndexRef.current !== null) {
        setSelectionIndex(pendingFocusIndexRef.current);
        pendingFocusIndexRef.current = null;
        return;
      }
      setFocusedIndex(Math.min(selection.start, length - 1));
    };

    const handleBlur = () => {
      setFocusedIndex(null);
    };

    useImperativeHandle(
      ref,
      () => ({
        focus: () => {
          inputRef.current?.focus();
          const nextIndex = Math.min(latestValueRef.current.length, length - 1);
          if (latestValueRef.current.length >= length) {
            setSelectionIndex(nextIndex);
          } else {
            setCaretIndex(nextIndex);
          }
        },
        blur: () => inputRef.current?.blur(),
        clear: () => {
          updateValue('');
          setSelectionIndex(0);
          inputRef.current?.blur();
          setFocusedIndex(null);
        },
        focusIndex: (index: number) => {
          if (index >= 0 && index < length) {
            inputRef.current?.focus();
            setSelectionIndex(index);
          }
        },
      }),
      [length, updateValue]
    );

    const slots = Array.from({ length }, (_, index) => index);

    const getAccessibilityLabel = () => {
      return label || props.accessibilityLabel;
    };

    const getAccessibilityHint = () => {
      let accessibilityHint = '';
      if (helperText) {
        accessibilityHint = accessibilityHint + helperText;
      }
      if (validationStatus !== 'initial') {
        if (accessibilityHint.length > 0) {
          accessibilityHint = accessibilityHint + ', ';
        }
        if (validationStatus === 'invalid' && invalidText) {
          accessibilityHint = accessibilityHint + invalidText;
        }
        if (validationStatus === 'valid' && validText) {
          accessibilityHint = accessibilityHint + validText;
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
        validationStatus={validationStatus}
        validText={validText}
        invalidText={invalidText}
        disabled={disabled}
        readonly={readonly}
        accessibilityHandledByChildren
        style={[styles.root, style]}
        {...props}
      >
        <View style={styles.slotsContainer}>
          <TextInput
            ref={inputRef}
            value={displayValue}
            autoFocus={autoFocus}
            editable={!disabled && !readonly}
            accessibilityLabel={getAccessibilityLabel()}
            accessibilityHint={getAccessibilityHint()}
            accessibilityState={{ disabled: disabled || readonly }}
            importantForAccessibility="yes"
            onChangeText={handleChangeText}
            onSelectionChange={event => {
              const nextSelection = event.nativeEvent.selection;
              if (
                ignoreNextSelectionRef.current &&
                (nextSelection.start !== latestSelectionRef.current.start ||
                  nextSelection.end !== latestSelectionRef.current.end)
              ) {
                return;
              }
              if (pendingFocusIndexRef.current !== null) {
                return;
              }
              ignoreNextSelectionRef.current = false;
              latestSelectionRef.current = nextSelection;
              setSelection(nextSelection);
              setFocusedIndex(Math.min(nextSelection.start, length - 1));
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
            selection={selection}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            autoComplete="sms-otp"
            secureTextEntry={secureTextEntry}
            maxLength={length}
            caretHidden
            style={styles.hiddenInput}
            testID={testID}
          />
          {slots.map(index => {
            const char = displayValue[index] || '';
            const isActive = focusedIndex === index;
            const displayChar = secureTextEntry && char ? '*' : char;

            return (
              <VerificationInputSlot
                key={index}
                value={displayChar}
                isActive={isActive}
                showCaret={isActive && !displayChar}
                validationStatus={validationStatus}
                disabled={disabled}
                readonly={readonly}
                secureTextEntry={secureTextEntry}
                onPress={() => {
                  pendingFocusIndexRef.current = index;
                  inputRef.current?.focus();
                  setSelectionIndex(index);
                }}
                testID={testID ? `${testID}-${index}` : undefined}
              />
            );
          })}
        </View>
      </FormField>
    );
  }
);

const styles = StyleSheet.create(theme => ({
  root: {
    gap: theme.components.input.verification.gap,
    width: '100%',
    maxWidth: theme.components.input.maxWidth,
  },
  slotsContainer: {
    flexDirection: 'row',
    gap: theme.components.input.verification.gap,
    width: '100%',
    position: 'relative',
  },
  hiddenInput: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    left: 0,
    top: 0,
    color: 'transparent',
    fontSize: 1,
    opacity: 0.01,
  },
}));

VerificationInput.displayName = 'VerificationInput';

export default VerificationInput;
