import type { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { CloseSmallIcon, TimeSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Keyboard, Platform, TextInputFocusEvent } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import type { DateType } from '../DatePicker/DatePicker.props';
import { useFormFieldContext } from '../FormField';
import { Input, InputField, InputSlot } from '../Input';
import { TimePicker } from '../TimePicker';
import { UnstyledIconButton } from '../UnstyledIconButton';
import type TimePickerInputProps from './TimePickerInput.props';
import { DEFAULT_FORMAT_12, DEFAULT_FORMAT_24, maskDefaultFormat } from './TimePickerInput.utils';
import TimePickerInputDoneButton from './TimePickerInputDoneButton';

dayjs.extend(customParseFormat);

const TimePickerInput = ({
  validationStatus = 'initial',
  disabled,
  focused,
  readonly,
  placeholder = '--:--',
  inBottomSheet = false,
  format,
  openButtonLabel = 'Open time picker',
  autoCloseOnSelect = true,
  label,
  labelVariant,
  helperText,
  helperIcon,
  validText,
  invalidText,
  required = true,
  onChange,
  onChangeText,
  onBlur,
  onFocus,
  value,
  timePickerProps,
  onClear,
  ...rest
}: TimePickerInputProps) => {
  const formFieldContext = useFormFieldContext();
  const isDisabled = formFieldContext?.disabled ?? disabled;
  const isReadonly = formFieldContext?.readonly ?? readonly;

  const pickerRef = useRef<BottomSheetModalMethods | null>(null);
  const accessoryViewID = useMemo(() => {
    if (Platform.OS !== 'ios') return undefined;
    return `timepicker-input-${Math.random().toString(36).slice(2)}`;
  }, []);

  const use12Hours = timePickerProps?.use12Hours ?? false;
  const resolvedFormat = useMemo(
    () => format ?? (use12Hours ? DEFAULT_FORMAT_12 : DEFAULT_FORMAT_24),
    [format, use12Hours]
  );

  const formatTime = useCallback(
    (dateValue?: DateType) => {
      if (!dateValue) return '';
      const parsed = dayjs(dateValue);
      return parsed.isValid() ? parsed.format(resolvedFormat) : '';
    },
    [resolvedFormat]
  );

  const isDefaultFormat = resolvedFormat === DEFAULT_FORMAT_24;

  const [inputValue, setInputValue] = useState(() => formatTime(value));

  useEffect(() => {
    setInputValue(formatTime(value));
  }, [value, formatTime]);

  const handleTextChange = useCallback(
    (text: string) => {
      const nextValue = isDefaultFormat ? maskDefaultFormat(text) : text;

      setInputValue(nextValue);
      onChangeText?.(nextValue);

      if (!nextValue) {
        onChange?.({ date: undefined });
        return;
      }

      const parsed = dayjs(nextValue, resolvedFormat, true);

      if (parsed.isValid()) {
        onChange?.({ date: parsed.toDate() });
      } else {
        onChange?.({ date: undefined });
      }
    },
    [isDefaultFormat, onChange, onChangeText, resolvedFormat]
  );

  const handleClear = useCallback(() => {
    setInputValue('');
    onChange?.({ date: undefined });
    onClear?.();
  }, [onChange, onClear]);

  const closeKeyboard = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  const openPicker = useCallback(() => {
    if (isDisabled || isReadonly) return;
    closeKeyboard();
    pickerRef.current?.present();
  }, [closeKeyboard, isDisabled, isReadonly]);

  const selectedDate = useMemo(() => {
    if (value) {
      return value;
    }

    const parsed = dayjs(inputValue, resolvedFormat, true);
    return parsed.isValid() ? parsed.toDate() : undefined;
  }, [value, inputValue, resolvedFormat]);

  const handlePickerChange = useCallback(
    ({ date }: { date: DateType }) => {
      if (!date) {
        handleClear();
        return;
      }

      const formatted = formatTime(date);
      setInputValue(formatted);
      onChange?.({ date });

      if (autoCloseOnSelect) {
        pickerRef.current?.close?.();
      }
    },
    [autoCloseOnSelect, formatTime, handleClear, onChange]
  );

  const handleBlur = useCallback(
    (event: TextInputFocusEvent) => {
      onBlur?.(event);
    },
    [onBlur]
  );

  const handleFocus = useCallback(
    (event: TextInputFocusEvent) => {
      onFocus?.(event);
    },
    [onFocus]
  );

  const { onCancel: pickerOnCancel, ...restTimePickerProps } = timePickerProps ?? {};
  const {
    style: inputStyle,
    keyboardType: keyboardTypeProp,
    inputMode: inputModeProp,
    accessibilityHint: accessibilityHintProp,
    accessibilityLabel: accessibilityLabelProp,
    accessible: accessibleProp,
    importantForAccessibility: importantForAccessibilityProp,
    ...textInputProps
  } = rest;

  const resolvedKeyboardType = keyboardTypeProp ?? (isDefaultFormat ? 'number-pad' : undefined);
  const resolvedInputMode = inputModeProp ?? (isDefaultFormat ? 'numeric' : undefined);
  const resolvedAccessibilityHint =
    accessibilityHintProp ?? `Enter the time in ${resolvedFormat} format`;
  const resolvedAccessibilityLabel = accessibilityLabelProp ?? 'Time input';
  const resolvedAccessible = accessibleProp ?? true;
  const resolvedImportantForAccessibility = importantForAccessibilityProp ?? 'yes';

  const handleCancel = useCallback(() => {
    pickerOnCancel?.();
    pickerRef.current?.close?.();
  }, [pickerOnCancel]);

  const placeholderValue = placeholder;

  return (
    <>
      <Input
        validationStatus={validationStatus}
        disabled={disabled}
        readonly={readonly}
        focused={focused}
        label={label}
        labelVariant={labelVariant}
        helperText={helperText}
        helperIcon={helperIcon}
        validText={validText}
        invalidText={invalidText}
        required={required}
        style={styles.wrap}
        accessible={false}
      >
        <InputField
          editable={!isReadonly && !isDisabled}
          value={inputValue}
          placeholder={placeholderValue}
          onChangeText={handleTextChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          inBottomSheet={inBottomSheet}
          keyboardType={resolvedKeyboardType}
          inputMode={resolvedInputMode}
          accessibilityHint={resolvedAccessibilityHint}
          aria-label="Time input"
          accessibilityLabel={resolvedAccessibilityLabel}
          accessible={resolvedAccessible}
          accessibilityState={{
            disabled: isDisabled || isReadonly,
          }}
          importantForAccessibility={resolvedImportantForAccessibility}
          inputAccessoryViewID={Platform.OS === 'ios' ? accessoryViewID : undefined}
          {...textInputProps}
          style={[styles.input, inputStyle]}
        />
        {!!inputValue && onClear && !isReadonly && !isDisabled && (
          <InputSlot accessibilityElementsHidden={false}>
            <UnstyledIconButton
              accessibilityLabel="Clear time"
              accessibilityHint="Removes the current time"
              icon={CloseSmallIcon}
              onPress={handleClear}
            />
          </InputSlot>
        )}
        <InputSlot accessibilityElementsHidden={false}>
          <UnstyledIconButton
            accessibilityLabel={openButtonLabel}
            accessibilityHint="Opens the time picker"
            icon={TimeSmallIcon}
            onPress={openPicker}
            disabled={isDisabled || isReadonly}
          />
        </InputSlot>
      </Input>
      <TimePicker
        ref={pickerRef}
        date={selectedDate}
        onChange={handlePickerChange}
        onCancel={handleCancel}
        {...restTimePickerProps}
      />
      {Platform.OS === 'ios' && accessoryViewID && (
        <TimePickerInputDoneButton
          accessoryViewID={accessoryViewID}
          closeKeyboard={closeKeyboard}
        />
      )}
    </>
  );
};

TimePickerInput.displayName = 'TimePickerInput';

const styles = StyleSheet.create(theme => ({
  wrap: {
    gap: theme.components.input.date.gap,
  },
  input: {
    paddingLeft: 0,
    paddingRight: 0,
  },
}));

export default TimePickerInput;
