import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { BodyText } from '../BodyText';
import { Input } from '../Input';
import type { DateInputSegmentProps } from './DateInput.props';

const DateInputSegment = ({
  label,
  placeholder,
  value,
  inputRef,
  onChange,
  onFocus,
  onBlur,
  disabled,
  validationStatus,
  maxLength,
  readonly,
  testID,
  inputContainerStyle,
  inputStyle,
  inputLabelStyle,
}: DateInputSegmentProps) => {
  styles.useVariants({ disabled });
  return (
    <View style={[styles.container, inputContainerStyle]}>
      <BodyText size="md" style={[styles.label, inputLabelStyle]}>
        {label}
      </BodyText>
      <Input
        ref={inputRef}
        value={value}
        onChangeText={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={disabled ? undefined : placeholder}
        keyboardType="number-pad"
        maxLength={maxLength}
        testID={testID}
        accessibilityLabel={label}
        disabled={disabled}
        validationStatus={validationStatus}
        readonly={readonly}
        style={inputStyle}
      />
    </View>
  );
};

DateInputSegment.displayName = 'DateInputSegment';

const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
    gap: theme.components.input.gap,
    maxWidth: 96,
  },
  label: {
    variants: {
      disabled: {
        true: {
          opacity: theme.opacity.disabled,
        },
      },
    },
  },
}));

export default DateInputSegment;
