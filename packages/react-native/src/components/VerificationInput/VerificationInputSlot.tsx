import { forwardRef } from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

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
    });

    return (
      <TextInput
        ref={ref}
        {...props}
        editable={!disabled && !readonly}
        selectTextOnFocus
        keyboardType="number-pad"
        cursorColor={styles.slot.color}
        selectionColor={styles.slot.color}
        style={[
          styles.slot,
          isActive && styles.slotActive,
          styles.slotVariant(validationStatus, isActive),
          style,
        ]}
      />
    );
  }
);

VerificationInputSlot.displayName = 'VerificationInputSlot';

const styles = StyleSheet.create(theme => ({
  slot: {
    width: theme.components.input.height,
    height: theme.components.input.height,
    borderWidth: theme.components.input.borderWidth,
    borderColor: theme.color.border.strong,
    borderRadius: theme.components.input.borderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.color.surface.neutral.strong,
    color: theme.color.text.primary,
    textAlign: 'center',
    fontFamily: theme.typography.mobile.bodyText.fontFamily,
    fontSize: theme.typography.mobile.bodyText.md.fontSize,
    lineHeight: theme.typography.mobile.bodyText.md.lineHeight,
    fontWeight: theme.fontWeight.regular,
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
    },
  },
  slotActive: {},
  slotVariant: (validationStatus: 'initial' | 'valid' | 'invalid', active: boolean) => {
    if (active) {
      if (validationStatus === 'invalid') {
        return {
          borderColor: theme.color.feedback.danger.border,
          borderWidth: theme.components.input.borderWidthFocused,
        };
      }
      return {
        borderColor: theme.color.border.strong,
        borderWidth: theme.components.input.borderWidthFocused,
      };
    }

    switch (validationStatus) {
      case 'invalid':
        return { borderColor: theme.color.feedback.danger.border };
      case 'valid':
        return { borderColor: theme.color.feedback.positive.border };
      default:
        return {};
    }
  },
}));
