import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { BodyText } from '../BodyText';
import { Input } from '../Input';
import type { DateInputProps } from './DateInput.props';

interface DateInputSegmentProps {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (text: string) => void;
  onFocus?: DateInputProps['onDayFocus'];
  onBlur?: DateInputProps['onDayBlur'];
  disabled?: boolean;
  required?: boolean;
  validationStatus?: DateInputProps['validationStatus'];
  maxLength?: number;
  readonly?: boolean;
  testID?: string;
}

const DateInputSegment = ({
  label,
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  disabled,
  validationStatus,
  maxLength,
  readonly,
  testID,
}: DateInputSegmentProps) => {
  styles.useVariants({ disabled });
  return (
    <View style={styles.container}>
      <BodyText size="md" style={styles.label}>
        {label}
      </BodyText>
      <Input
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
        style={styles.input}
      />
    </View>
  );
};

DateInputSegment.displayName = 'DateInputSegment';

const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
    gap: theme.components.input.gap,
    // maxWidth: 96,
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
  input: {
    // maxWidth: 96,
  },
}));

export default DateInputSegment;
