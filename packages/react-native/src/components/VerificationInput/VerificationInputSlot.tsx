import { forwardRef } from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import InputField from '../Input/InputField';

interface VerificationInputSlotProps extends TextInputProps {
  isActive: boolean;
  validationStatus: 'initial' | 'valid' | 'invalid';
  disabled?: boolean;
  readonly?: boolean;
}

export const VerificationInputSlot = forwardRef<TextInput, VerificationInputSlotProps>(
  ({ isActive, validationStatus, disabled, readonly, style, ...props }, ref) => {
    styles.useVariants({
      disabled,
      readonly,
      validationStatus,
      active: isActive,
    });

    return (
      <InputField
        ref={ref}
        {...props}
        editable={!disabled && !readonly}
        selectTextOnFocus
        keyboardType="number-pad"
        style={[styles.slot, style]}
      />
    );
  }
);

VerificationInputSlot.displayName = 'VerificationInputSlot';

const styles = StyleSheet.create(theme => ({
  slot: {
    flex: 0,
    width: theme.components.input.height,
    height: theme.components.input.height,
    borderWidth: theme.components.input.borderWidth,
    borderColor: theme.color.border.strong,
    borderRadius: theme.components.input.borderRadius,
    backgroundColor: theme.color.surface.neutral.strong,
    textAlign: 'center',
    padding: 0,
    variants: {
      disabled: {
        true: {
          opacity: theme.opacity.disabled,
          color: theme.color.text.secondary,
        },
      },
      readonly: {
        true: {
          borderColor: theme.color.border.subtle,
          backgroundColor: theme.color.surface.neutral.subtle,
        },
      },
      validationStatus: {
        initial: {},
        valid: {
          borderColor: theme.color.feedback.positive.border,
        },
        invalid: {
          borderColor: theme.color.feedback.danger.border,
        },
      },
      active: {
        true: {
          borderColor: theme.color.border.strong,
          borderWidth: theme.components.input.borderWidthFocused,
        },
      },
    },
    compoundVariants: [
      {
        validationStatus: 'invalid',
        active: true,
        styles: {
          borderColor: theme.color.feedback.danger.border,
        },
      },
      {
        validationStatus: 'valid',
        active: true,
        styles: {
          borderColor: theme.color.border.strong,
        },
      },
    ],
  },
}));
