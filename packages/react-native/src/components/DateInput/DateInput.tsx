import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { FormField } from '../FormField';
import type { DateInputProps } from './DateInput.props';
import DateInputSegment from './DateInputSegment';

const DateInput = ({
  label,
  helperText,
  helperIcon,
  validationStatus = 'initial',
  validText,
  invalidText,
  disabled,
  readonly,
  required,
  hideDay = false,
  hideMonth = false,
  hideYear = false,
  dayPlaceholder = 'DD',
  monthPlaceholder = 'MM',
  yearPlaceholder = 'YYYY',
  dayValue,
  monthValue,
  yearValue,
  onDayChange,
  onMonthChange,
  onYearChange,
  onDayFocus,
  onMonthFocus,
  onYearFocus,
  onDayBlur,
  onMonthBlur,
  onYearBlur,
  ...props
}: DateInputProps) => {
  return (
    <FormField
      label={label}
      helperText={helperText}
      helperIcon={helperIcon}
      validationStatus={validationStatus}
      validText={validText}
      invalidText={invalidText}
      disabled={disabled}
      readonly={readonly}
      required={required}
      style={styles.wrap}
      {...props}
    >
      <View style={styles.container}>
        {!hideDay && (
          <DateInputSegment
            label="Day"
            placeholder={dayPlaceholder}
            value={dayValue}
            onChange={onDayChange}
            onFocus={onDayFocus}
            onBlur={onDayBlur}
            disabled={disabled}
            required={required}
            validationStatus={validationStatus}
            maxLength={2}
            testID="date-input-day"
          />
        )}
        {!hideMonth && (
          <DateInputSegment
            label="Month"
            placeholder={monthPlaceholder}
            value={monthValue}
            onChange={onMonthChange}
            onFocus={onMonthFocus}
            onBlur={onMonthBlur}
            disabled={disabled}
            required={required}
            validationStatus={validationStatus}
            maxLength={2}
            testID="date-input-month"
          />
        )}
        {!hideYear && (
          <DateInputSegment
            label="Year"
            placeholder={yearPlaceholder}
            value={yearValue}
            onChange={onYearChange}
            onFocus={onYearFocus}
            onBlur={onYearBlur}
            disabled={disabled}
            required={required}
            validationStatus={validationStatus}
            maxLength={4}
            testID="date-input-year"
          />
        )}
      </View>
    </FormField>
  );
};

DateInput.displayName = 'DateInput';

const styles = StyleSheet.create(theme => ({
  wrap: {
    gap: theme.components.input.gap,
  },
  container: {
    flexDirection: 'row',
    gap: theme.components.input.date.gap,
  },
}));

export default DateInput;
