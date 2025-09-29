import type { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { CalendarSmallIcon, CloseSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Keyboard, Platform, TextInputFocusEvent } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { DatePicker } from '../DatePicker';
import type { DateType } from '../DatePicker/DatePicker.props';
import { useFormFieldContext } from '../FormField';
import { Input, InputField, InputSlot } from '../Input';
import { UnstyledIconButton } from '../UnstyledIconButton';
import type DatePickerInputProps from './DatePickerInput.props';
import DatePickerInputDoneButton from './DatePickerInputDoneButton';

dayjs.extend(customParseFormat);

const DEFAULT_FORMAT = 'DD/MM/YYYY';

const maskDefaultFormat = (value: string) => {
  const digitsOnly = value.replace(/\D/g, '').slice(0, 8);
  const day = digitsOnly.slice(0, 2);
  const month = digitsOnly.slice(2, 4);
  const year = digitsOnly.slice(4, 8);

  return [day, month, year].filter(Boolean).join('/');
};

const DatePickerInput = ({
  validationStatus = 'initial',
  disabled,
  focused,
  readonly,
  placeholder,
  inBottomSheet = false,
  format = DEFAULT_FORMAT,
  openButtonLabel = 'Open date picker',
  autoCloseOnSelect = true,
  onChange,
  onChangeText,
  onBlur,
  onFocus,
  value,
  datePickerProps,
  onClear,
  ...rest
}: DatePickerInputProps) => {
  const formFieldContext = useFormFieldContext();
  const validationStatusFromContext = formFieldContext?.validationStatus ?? validationStatus;
  const isDisabled = formFieldContext?.disabled ?? disabled;
  const isReadonly = formFieldContext?.readonly ?? readonly;

  const pickerRef = useRef<BottomSheetModalMethods | null>(null);
  const accessoryViewID = useMemo(() => {
    if (Platform.OS !== 'ios') return undefined;
    return `datepicker-input-${Math.random().toString(36).slice(2)}`;
  }, []);

  const formatDate = useCallback(
    (dateValue?: DateType) => {
      if (!dateValue) return '';
      const parsed = dayjs(dateValue);
      return parsed.isValid() ? parsed.format(format) : '';
    },
    [format]
  );

  const isDefaultFormat = format === DEFAULT_FORMAT;

  const [inputValue, setInputValue] = useState(() => formatDate(value));

  useEffect(() => {
    setInputValue(formatDate(value));
  }, [value, formatDate]);

  const handleTextChange = useCallback(
    (text: string) => {
      const nextValue = isDefaultFormat ? maskDefaultFormat(text) : text;

      setInputValue(nextValue);
      onChangeText?.(nextValue);

      if (!nextValue) {
        onChange?.({ date: undefined });
        return;
      }

      const parsed = dayjs(nextValue, format, true);

      if (parsed.isValid()) {
        onChange?.({ date: parsed.toDate() });
      } else {
        onChange?.({ date: undefined });
      }
    },
    [format, isDefaultFormat, onChange, onChangeText]
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

    const parsed = dayjs(inputValue, format, true);
    return parsed.isValid() ? parsed.toDate() : undefined;
  }, [value, inputValue, format]);

  const handlePickerChange = useCallback(
    ({ date }: { date: DateType }) => {
      if (!date) {
        handleClear();
        return;
      }

      const formatted = formatDate(date);
      setInputValue(formatted);
      onChange?.({ date });

      if (autoCloseOnSelect) {
        pickerRef.current?.close?.();
      }
    },
    [autoCloseOnSelect, formatDate, handleClear, onChange]
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

  const { onCancel: pickerOnCancel, ...restDatePickerProps } = datePickerProps ?? {};
  const {
    style: inputStyle,
    keyboardType: keyboardTypeProp,
    inputMode: inputModeProp,
    accessibilityHint: accessibilityHintProp,
    accessibilityLabel: accessibilityLabelProp,
    accessible: accessibleProp,
    accessibilityRole: accessibilityRoleProp,
    importantForAccessibility: importantForAccessibilityProp,
    ...textInputProps
  } = rest;

  const resolvedKeyboardType = keyboardTypeProp ?? (isDefaultFormat ? 'number-pad' : undefined);
  const resolvedInputMode = inputModeProp ?? (isDefaultFormat ? 'numeric' : undefined);
  const resolvedAccessibilityHint = accessibilityHintProp ?? `Enter the date in ${format} format`;
  const resolvedAccessibilityLabel = accessibilityLabelProp ?? 'Date input';
  const resolvedAccessible = accessibleProp ?? true;
  const resolvedAccessibilityRole = accessibilityRoleProp ?? 'combobox';
  const resolvedImportantForAccessibility = importantForAccessibilityProp ?? 'yes';

  const handleCancel = useCallback(() => {
    pickerOnCancel?.();
    pickerRef.current?.close?.();
  }, [pickerOnCancel]);

  const placeholderValue = placeholder ?? format;

  return (
    <>
      <Input
        validationStatus={validationStatusFromContext}
        disabled={isDisabled}
        readonly={isReadonly}
        focused={focused}
        style={styles.wrap}
        accessible={false}
        importantForAccessibility="no"
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
          accessibilityLabel={resolvedAccessibilityLabel}
          accessible={resolvedAccessible}
          accessibilityRole={resolvedAccessibilityRole}
          importantForAccessibility={resolvedImportantForAccessibility}
          inputAccessoryViewID={Platform.OS === 'ios' ? accessoryViewID : undefined}
          {...textInputProps}
          style={[styles.input, inputStyle]}
        />
        {!!inputValue && onClear && !isReadonly && !isDisabled && (
          <InputSlot>
            <UnstyledIconButton
              accessibilityLabel="Clear date"
              icon={CloseSmallIcon}
              onPress={handleClear}
            />
          </InputSlot>
        )}
        <InputSlot>
          <UnstyledIconButton
            accessibilityLabel={openButtonLabel}
            icon={CalendarSmallIcon}
            onPress={openPicker}
            disabled={isDisabled || isReadonly}
          />
        </InputSlot>
      </Input>
      <DatePicker
        ref={pickerRef}
        mode="single"
        date={selectedDate}
        onChange={handlePickerChange}
        onCancel={handleCancel}
        {...restDatePickerProps}
      />
      {Platform.OS === 'ios' && accessoryViewID && (
        <DatePickerInputDoneButton
          accessoryViewID={accessoryViewID}
          closeKeyboard={closeKeyboard}
        />
      )}
    </>
  );
};

DatePickerInput.displayName = 'DatePickerInput';

const styles = StyleSheet.create(theme => ({
  wrap: {
    gap: theme.components.input.date.gap,
  },
  input: {
    paddingLeft: 0,
    paddingRight: 0,
  },
}));

export default DatePickerInput;
