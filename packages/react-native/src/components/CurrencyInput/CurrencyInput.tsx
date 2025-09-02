import { Platform } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { DetailText } from '../DetailText';
import { useFormFieldContext } from '../FormField';
import { Input, InputField, InputSlot } from '../Input';
import type CurrencyInputProps from './CurrencyInput.props';

const CurrencyInput = ({
  validationStatus = 'initial',
  disabled,
  focused,
  readonly,
  placeholder,
  inBottomSheet = false,
  required,
  ...props
}: CurrencyInputProps) => {
  const formFieldContext = useFormFieldContext();
  const { disabled: formFieldDisabled } = formFieldContext;
  const validationStatusFromContext = formFieldContext?.validationStatus ?? validationStatus;

  const defaultFormat = '0.00';
  const getPlaceholder = placeholder ?? defaultFormat;

  return (
    <Input
      validationStatus={validationStatusFromContext}
      disabled={formFieldDisabled ?? disabled}
      readonly={readonly}
      focused={focused}
      style={styles.wrap}
    >
      <InputSlot>
        <DetailText size="4xl" style={styles.text}>
          £
        </DetailText>
      </InputSlot>
      <InputField
        inputMode="decimal"
        inBottomSheet={inBottomSheet}
        {...props}
        placeholder={getPlaceholder}
        keyboardType="decimal-pad"
        style={styles.input}
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
    ...(Platform.OS === 'ios' && { lineHeight: 46 }),
  },
  input: {
    fontSize: theme.typography.mobile.detailText['4xl'].fontSize,
    fontFamily: theme.typography.mobile.detailText.fontFamily,
    fontWeight: theme.typography.mobile.detailText.fontWeight,
    paddingTop: 0,
    paddingBottom: 0,
  },
}));

export default CurrencyInput;
