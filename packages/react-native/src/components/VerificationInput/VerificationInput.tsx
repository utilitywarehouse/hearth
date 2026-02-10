import { forwardRef, useImperativeHandle } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { FormField } from '../FormField';
import { useVerificationInput } from './useVerificationInput';
import type { VerificationInputHandle, VerificationInputProps } from './VerificationInput.props';
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
      ...props
    },
    ref
  ) => {
    const length = 6;
    const {
      inputRefs,
      displayValue,
      focusedIndex,
      handleFocus,
      handleBlur,
      handleChangeText,
      handleKeyPress,
    } = useVerificationInput({
      value,
      onChangeText,
    });

    useImperativeHandle(
      ref,
      () => ({
        focus: () => inputRefs.current[0]?.focus(),
        blur: () => {
          inputRefs.current.forEach(input => input?.blur());
        },
        clear: () => onChangeText?.(''),
        focusIndex: (index: number) => {
          if (index >= 0 && index < length) {
            inputRefs.current[index]?.focus();
          }
        },
      }),
      [length, onChangeText]
    );

    const slots = Array.from({ length }, (_, index) => index);

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
        style={[styles.root, style]}
        {...props}
      >
        <View style={styles.slotsContainer}>
          {slots.map(index => {
            const char = displayValue[index] || '';
            const isActive = focusedIndex === index;

            return (
              <VerificationInputSlot
                key={index}
                ref={inputRef => {
                  inputRefs.current[index] = inputRef;
                }}
                autoFocus={index === 0 && autoFocus}
                value={char}
                isActive={isActive}
                validationStatus={validationStatus}
                disabled={disabled}
                readonly={readonly}
                secureTextEntry={secureTextEntry}
                onChangeText={text => handleChangeText(text, index)}
                onKeyPress={e => handleKeyPress(e, index)}
                onFocus={() => handleFocus(index)}
                onBlur={handleBlur}
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
  },
}));

VerificationInput.displayName = 'VerificationInput';

export default VerificationInput;
