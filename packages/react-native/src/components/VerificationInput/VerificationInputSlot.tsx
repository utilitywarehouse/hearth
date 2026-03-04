import { forwardRef, useEffect } from 'react';
import { Pressable, Text, View, ViewProps } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';

interface VerificationInputSlotProps extends ViewProps {
  value: string;
  isActive: boolean;
  showCaret?: boolean;
  validationStatus: 'initial' | 'valid' | 'invalid';
  disabled?: boolean;
  readonly?: boolean;
  onPress?: () => void;
  secureTextEntry?: boolean;
}

export const VerificationInputSlot = forwardRef<View, VerificationInputSlotProps>(
  (
    {
      value,
      isActive,
      showCaret,
      validationStatus,
      disabled,
      readonly,
      style,
      onPress,
      secureTextEntry,
      ...props
    },
    ref
  ) => {
    styles.useVariants({
      disabled,
      readonly,
      validationStatus,
      active: isActive,
      secureTextEntry,
    });

    const caretOpacity = useSharedValue(0);
    const animatedCaretStyle = useAnimatedStyle(() => ({
      opacity: caretOpacity.value,
    }));

    useEffect(() => {
      if (showCaret && !disabled && !readonly) {
        caretOpacity.value = withRepeat(
          withTiming(1, { duration: 500, easing: Easing.inOut(Easing.ease) }),
          -1,
          true
        );
        return;
      }

      caretOpacity.value = withTiming(0, { duration: 150, easing: Easing.out(Easing.ease) });
    }, [caretOpacity, disabled, readonly, showCaret]);

    return (
      <Pressable
        ref={ref}
        onPress={onPress}
        disabled={disabled || readonly}
        style={[styles.slot, style]}
        accessibilityRole="button"
        accessible={false}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        {...props}
      >
        <Text style={styles.slotText}>{value}</Text>
        {showCaret && !disabled && !readonly && (
          <Animated.View style={[styles.caret, animatedCaretStyle]} />
        )}
      </Pressable>
    );
  }
);

VerificationInputSlot.displayName = 'VerificationInputSlot';

const styles = StyleSheet.create(theme => ({
  slot: {
    flexGrow: 0,
    flexShrink: 0,
    width: theme.components.input.height,
    height: theme.components.input.height,
    minWidth: theme.components.input.height,
    minHeight: theme.components.input.height,
    borderWidth: theme.components.input.borderWidth,
    borderColor: theme.color.border.strong,
    borderRadius: theme.components.input.borderRadius,
    backgroundColor: theme.color.surface.neutral.strong,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    position: 'relative',
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
  slotText: {
    color: theme.color.text.primary,
    fontSize: theme.typography.mobile.bodyText.md.fontSize,
    fontFamily: theme.typography.mobile.bodyText.fontFamily,
    fontWeight: `${theme.typography.mobile.bodyText.fontWeight}`,
    textAlign: 'center',
    variants: {
      secureTextEntry: {
        true: {
          paddingTop: 5,
        },
      },
    },
  },
  caret: {
    position: 'absolute',
    width: 2,
    height: '55%',
    backgroundColor: theme.color.text.brand,
  },
}));
