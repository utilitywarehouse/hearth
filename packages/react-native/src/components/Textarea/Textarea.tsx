import { createTextarea } from '@gluestack-ui/textarea';
import type TextareaProps from './Textarea.props';

import { useEffect, useMemo, useRef } from 'react';
import {
  View,
  type LayoutChangeEvent,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { Path, Svg } from 'react-native-svg';
import { StyleSheet } from 'react-native-unistyles';
import { useTheme } from '../../hooks';
import { FormField, useFormFieldContext } from '../FormField';
import TextareaFieldComponent from './TextareaField';
import TextareaRoot from './TextareaRoot';

export const TextareaComponent = createTextarea({
  Root: TextareaRoot,
  Input: TextareaFieldComponent,
});

export const TextareaField = TextareaComponent.Input;

const DEFAULT_TEXTAREA_HEIGHT = 96;
const RESIZE_HANDLE_TOUCH_SIZE = 28;
const RESIZE_HANDLE_ICON_SIZE = 9;

const Textarea = ({
  validationStatus = 'initial',
  children,
  resizable = false,
  defaultHeight,
  disabled,
  focused,
  readonly,
  label,
  labelVariant,
  helperText,
  validText,
  invalidText,
  required,
  helperIcon,
  onLayout,
  ...props
}: TextareaProps) => {
  const formFieldContext = useFormFieldContext();
  const hasMeasuredHeight = useRef(false);
  const textareaLabel = label ?? formFieldContext?.label;
  const textareaHelperText = helperText ?? formFieldContext?.helperText;
  const textareaValidText = validText ?? formFieldContext?.validText;
  const textareaInvalidText = invalidText ?? formFieldContext?.invalidText;
  const textareaRequired = required ?? formFieldContext?.required;
  const textareaDisabled = disabled ?? formFieldContext?.disabled;
  const textareaReadonly = readonly ?? formFieldContext?.readonly;
  const textareaValidationStatus = formFieldContext?.validationStatus ?? validationStatus;
  const textareaDefaultHeight = defaultHeight ?? DEFAULT_TEXTAREA_HEIGHT;
  const textareaHeight = useSharedValue(textareaDefaultHeight);
  const resizeStartHeight = useSharedValue(textareaDefaultHeight);
  const theme = useTheme();

  useEffect(() => {
    if (formFieldContext?.setShouldHandleAccessibility) {
      formFieldContext.setShouldHandleAccessibility(true);
    }
  }, [formFieldContext]);

  useEffect(() => {
    if (!hasMeasuredHeight.current) {
      textareaHeight.value = textareaDefaultHeight;
      resizeStartHeight.value = textareaDefaultHeight;
    }
  }, [resizeStartHeight, textareaDefaultHeight, textareaHeight]);

  const getAccessibilityLabel = () => {
    let accessibilityLabel = '';
    if (textareaLabel) {
      accessibilityLabel = accessibilityLabel + textareaLabel;
    }
    if (textareaRequired) {
      accessibilityLabel = accessibilityLabel + ', required';
    }

    return accessibilityLabel || props.accessibilityLabel;
  };

  const getAccessibilityHint = () => {
    let accessibilityHint = '';
    if (textareaHelperText) {
      accessibilityHint = accessibilityHint + textareaHelperText;
    }
    if (textareaValidationStatus !== 'initial') {
      if (accessibilityHint.length > 0) {
        accessibilityHint = accessibilityHint + ', ';
      }
      if (textareaValidationStatus === 'invalid' && textareaInvalidText) {
        accessibilityHint = accessibilityHint + textareaInvalidText;
      }
      if (textareaValidationStatus === 'valid' && textareaValidText) {
        accessibilityHint = accessibilityHint + textareaValidText;
      }
    }
    return accessibilityHint || props.accessibilityHint;
  };

  const handleTextareaLayout = (event: LayoutChangeEvent) => {
    if (!hasMeasuredHeight.current) {
      textareaHeight.value = event.nativeEvent.layout.height;
      resizeStartHeight.value = event.nativeEvent.layout.height;
      hasMeasuredHeight.current = true;
    }

    if (children) {
      onLayout?.(event);
    }
  };

  const resizeGesture = useMemo(
    () =>
      Gesture.Pan()
        .enabled(resizable && !textareaDisabled)
        .onBegin(() => {
          resizeStartHeight.value = textareaHeight.value;
        })
        .onUpdate(event => {
          const nextHeight =
            resizeStartHeight.value + event.translationY + event.translationX * 0.35;

          textareaHeight.value = Math.max(DEFAULT_TEXTAREA_HEIGHT, nextHeight);
        }),
    [resizable, resizeStartHeight, textareaDisabled, textareaHeight]
  );

  const animatedHeightStyle = useAnimatedStyle(
    () => ({
      height: textareaHeight.value,
    }),
    [textareaHeight]
  );

  const rootStyle = (children ? props.style : undefined) as StyleProp<ViewStyle>;
  const inputStyle = (!children ? props.style : undefined) as StyleProp<TextStyle>;
  const textareaStyle = (
    resizable ? [rootStyle, animatedHeightStyle] : rootStyle
  ) as StyleProp<ViewStyle>;

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
    >
      <TextareaComponent
        {...(children ? props : {})}
        onLayout={handleTextareaLayout}
        style={textareaStyle}
        validationStatus={textareaValidationStatus}
        isInvalid={textareaValidationStatus === 'invalid'}
        isReadOnly={textareaReadonly}
        isDisabled={textareaDisabled}
        isFocused={focused}
        required={textareaRequired}
        aria-label={getAccessibilityLabel()}
        accessibilityHint={getAccessibilityHint()}
      >
        {children ? (
          <>{children}</>
        ) : (
          <>
            <TextareaField {...props} onLayout={onLayout} style={[styles.textarea, inputStyle]} />
          </>
        )}
        {resizable && !textareaDisabled ? (
          <GestureDetector gesture={resizeGesture}>
            <View style={styles.resizeHandle}>
              <Svg
                width={RESIZE_HANDLE_ICON_SIZE}
                height={RESIZE_HANDLE_ICON_SIZE}
                viewBox="0 0 9 9"
                fill="none"
              >
                <Path
                  d="M0.353516 8.35355L8.35352 0.353546M4.35352 8.35355L8.35352 4.35355"
                  stroke={theme.color.icon.primary}
                />
              </Svg>
            </View>
          </GestureDetector>
        ) : null}
      </TextareaComponent>
    </FormField>
  );
};

const styles = StyleSheet.create({
  textarea: {
    padding: 0,
    _web: {
      outlineStyle: 'none',
      _focusVisible: {
        outlineStyle: 'none',
      },
    },
  },
  resizeHandle: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: RESIZE_HANDLE_TOUCH_SIZE,
    height: RESIZE_HANDLE_TOUCH_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
});

export default Textarea;
