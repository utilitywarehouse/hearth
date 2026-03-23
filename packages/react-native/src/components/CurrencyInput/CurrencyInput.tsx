import { Platform } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { formatThousands } from '../../utils';
import { DetailText } from '../DetailText';
import { Input, InputField, InputSlot } from '../Input';
import type CurrencyInputProps from './CurrencyInput.props';

const CurrencyInput = ({
  validationStatus = 'initial',
  disabled,
  focused,
  readonly,
  placeholder,
  inBottomSheet = false,
  required = true,
  disableGroupSeparator = false,
  value,
  onChangeText,
  label,
  labelVariant = 'body',
  helperText,
  helperIcon,
  validText,
  invalidText,
  ref,
  ...rest
}: CurrencyInputProps) => {
  const defaultFormat = '0.00';
  const getPlaceholder = placeholder ?? defaultFormat;

  const handleChangeText = (text: string) => {
    if (!disableGroupSeparator) {
      const formatted = formatThousands(text);
      onChangeText?.(formatted);
    } else {
      onChangeText?.(text);
    }
  };

  const displayValue =
    !disableGroupSeparator && typeof value === 'string' ? formatThousands(value) : value;

  return (
    <Input
      validationStatus={validationStatus}
      disabled={disabled}
      readonly={readonly}
      focused={focused}
      required={required}
      style={styles.wrap}
      label={label}
      labelVariant={labelVariant}
      helperText={helperText}
      helperIcon={helperIcon}
      validText={validText}
      invalidText={invalidText}
    >
      <InputSlot>
        <DetailText size="3xl" style={styles.text} accessible={false}>
          £
        </DetailText>
      </InputSlot>
      <InputField
        ref={ref as any}
        inputMode="decimal"
        inBottomSheet={inBottomSheet}
        accessibilityHint='Enter the amount in pounds and pence, for example "10.99"'
        {...rest}
        placeholder={getPlaceholder}
        keyboardType="decimal-pad"
        style={styles.input}
        value={displayValue as any}
        onChangeText={handleChangeText}
      />
    </Input>
  );
};

CurrencyInput.displayName = 'CurrencyInput';
const styles = StyleSheet.create(theme => ({
  wrap: {
    height: theme.components.input.currency.height,
    gap: theme.components.input.currency.gap,
  },
  text: {
    ...(Platform.OS === 'ios' && { lineHeight: 40 }),
    _web: {
      marginTop: 1,
    },
  },
  input: {
    fontSize: theme.typography.mobile.detailText['3xl'].fontSize,
    fontFamily: theme.typography.mobile.detailText.fontFamily,
    fontWeight: `${theme.typography.mobile.detailText.fontWeight}`,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
  },
}));

export default CurrencyInput;
