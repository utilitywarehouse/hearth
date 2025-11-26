import React, { useRef, useState } from 'react';
import {
  NativeSyntheticEvent,
  Pressable,
  TextInput,
  TextInputSelectionChangeEventData,
  View,
} from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { BodyText } from '../BodyText';
import { Helper } from '../Helper';
import { Label } from '../Label';
import VerificationInputProps from './VerificationInput.props';

const VerificationInput = ({
  value = '',
  onChangeText,
  length = 6,
  label,
  helperText,
  helperIcon,
  validationStatus = 'initial',
  validText,
  invalidText,
  disabled = false,
  readonly = false,
  secureTextEntry = false,
  style,
  ...props
}: VerificationInputProps) => {
  const inputRef = useRef<TextInput>(null);
  const [focused, setFocused] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [selection, setSelection] = useState({ start: value.length, end: value.length });

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (focused && !disabled && !readonly) {
      interval = setInterval(() => {
        setCursorVisible(v => !v);
      }, 500);
    }
    return () => clearInterval(interval);
  }, [focused, disabled, readonly]);

  styles.useVariants({
    disabled,
    readonly,
    // @ts-expect-error - validationStatus is not in the types but is used in slotVariant
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    validationStatus: validationStatus as any,
  });

  const handlePress = () => {
    if (!disabled && !readonly) {
      inputRef.current?.focus();
    }
  };

  const handleSlotPress = (index: number) => {
    if (!disabled && !readonly) {
      const targetIndex = Math.min(index, value.length);
      const newSelection = {
        start: targetIndex,
        end: targetIndex + (index < value.length ? 1 : 0),
      };
      setSelection(newSelection);
      inputRef.current?.focus();
    }
  };

  const handleSelectionChange = (e: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => {
    setSelection(e.nativeEvent.selection);
  };

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  const handleChangeText = (text: string) => {
    if (!/^\d*$/.test(text)) {
      return;
    }

    if (text.length <= length) {
      onChangeText?.(text);
    }
  };

  // Create array of length for rendering slots
  const slots = Array.from({ length }, (_, index) => index);

  return (
    <View style={[styles.root, style]} {...props}>
      {!!label && (
        <Label disabled={disabled} style={styles.label}>
          {label}
        </Label>
      )}

      <Pressable onPress={handlePress} style={styles.inputContainer}>
        <TextInput
          ref={inputRef}
          value={value}
          onChangeText={handleChangeText}
          onSelectionChange={handleSelectionChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          maxLength={length}
          editable={!disabled && !readonly}
          style={styles.hiddenInput}
          keyboardType="number-pad" // Default to number pad
          secureTextEntry={secureTextEntry}
          // caretHidden // Remove caretHidden to show native cursor if we want, but we are hiding the input opacity 0
          // If we want native cursor, input must be visible (opacity 1) but transparent text?
          // React Native TextInput doesn't support transparent text with visible cursor easily cross-platform.
          // Color: 'transparent' hides cursor too usually.
          caretHidden={true}
          selection={selection}
        />

        <View style={styles.slotsContainer}>
          {slots.map(index => {
            const char = value[index];
            // Active if this slot is part of the selection range
            const isActive =
              focused &&
              !disabled &&
              !readonly &&
              (selection.start === index ||
                (value.length === length && index === length - 1 && selection.start === length));

            return (
              <Pressable
                key={index}
                onPress={() => handleSlotPress(index)}
                style={[
                  styles.slot,
                  isActive && styles.slotActive,
                  styles.slotVariant(validationStatus, isActive),
                ]}
              >
                <BodyText style={styles.slotText}>
                  {char ? (secureTextEntry ? '•' : char) : ''}
                </BodyText>
                {isActive && cursorVisible && !char && <View style={styles.cursor} />}
              </Pressable>
            );
          })}
        </View>
      </Pressable>

      {!!helperText && (
        <Helper disabled={disabled} icon={helperIcon} text={helperText} style={styles.helper} />
      )}
      {validationStatus === 'invalid' && !!invalidText && (
        <Helper
          validationStatus="invalid"
          text={invalidText}
          disabled={disabled}
          style={styles.helper}
        />
      )}
      {validationStatus === 'valid' && !!validText && (
        <Helper
          validationStatus="valid"
          text={validText}
          disabled={disabled}
          style={styles.helper}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  root: {
    gap: theme.components.input.verification.gap,
    width: '100%',
    maxWidth: theme.components.input.maxWidth,
  },
  label: {
    marginBottom: theme.components.input.label.gap,
  },
  inputContainer: {
    position: 'relative',
  },
  hiddenInput: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0,
    zIndex: 1, // Ensure it sits on top to capture touches but pointerEvents controlled dynamically if needed,
    // or we rely on bubbling. Since slots are Pressables, they need to receive touches.
    // If TextInput is on top, it consumes touches.
    // We set pointerEvents to none so touches pass through to slots, but we manage focus programmatically.
    // However, if we set pointerEvents to none, we lose "tap anywhere else to focus".
    // The wrapping Pressable handles "tap anywhere".
    pointerEvents: 'none',
  },
  slotsContainer: {
    flexDirection: 'row',
    gap: theme.components.input.verification.gap,
    width: '100%',
  },
  slot: {
    flex: 1,
    height: theme.components.input.height,
    minWidth: theme.components.input.height,
    borderWidth: theme.components.input.borderWidth,
    borderColor: theme.color.border.strong,
    borderRadius: theme.components.input.borderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.color.surface.neutral.strong,
    variants: {
      disabled: {
        true: {
          opacity: theme.opacity.disabled,
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
  slotActive: {
    // This style is applied when the slot is active (focused)
  },
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
        return {
          borderColor: theme.color.feedback.danger.border,
        };
      case 'valid':
        return {
          borderColor: theme.color.feedback.positive.border,
        };
      default:
        return {};
    }
  },
  slotText: {
    color: theme.color.text.primary,
    textAlign: 'center',
    variants: {
      disabled: {
        true: {
          // Use secondary color for disabled text - casting to any to bypass strict theme token type check
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          color: theme.color.text.secondary as any,
        },
      },
    },
  },
  helper: {
    marginTop: theme.components.input.verification.gap,
  },
  cursor: {
    position: 'absolute',
    width: 2,
    height: '50%',
    backgroundColor: theme.color.text.primary,
  },
}));

VerificationInput.displayName = 'VerificationInput';

export default VerificationInput;
