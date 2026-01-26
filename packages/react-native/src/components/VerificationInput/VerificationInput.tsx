import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { FormField } from '../FormField';
import { useVerificationInput } from './useVerificationInput';
import VerificationInputProps from './VerificationInput.props';
import { VerificationInputSlot } from './VerificationInputSlot';

const VerificationInput = ({
  value = '',
  onChangeText,
  label,
  labelVariant = 'body',
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
  const length = 6;
  const { inputRefs, focusedIndex, handleFocus, handleBlur, handleChangeText, handleKeyPress } =
    useVerificationInput({
      value,
      onChangeText,
    });

  const slots = Array.from({ length }, (_, index) => index);

  return (
    <FormField
      label={label}
      labelVariant={labelVariant}
      helperText={helperText}
      helperIcon={helperIcon}
      validationStatus={validationStatus}
      validText={validText}
      invalidText={invalidText}
      disabled={disabled}
      readonly={readonly}
      style={[styles.root, style]}
      {...props}
    >
      <View style={styles.slotsContainer}>
        {slots.map(index => {
          const char = value[index] || '';
          const isActive = focusedIndex === index;

          return (
            <VerificationInputSlot
              key={index}
              ref={ref => {
                inputRefs.current[index] = ref;
              }}
              value={char}
              isActive={isActive}
              validationStatus={validationStatus}
              disabled={disabled}
              readonly={readonly}
              secureTextEntry={secureTextEntry}
              onChangeText={text => handleChangeText(text, index)}
              onKeyPress={e => handleKeyPress(e, index)}
              onFocus={() => handleFocus(index)}
              onBlur={handleBlur}
            />
          );
        })}
      </View>
    </FormField>
  );
};

const styles = StyleSheet.create(theme => ({
  root: {
    gap: theme.components.input.verification.gap,
    width: '100%',
    maxWidth: theme.components.input.maxWidth,
  },
  slotsContainer: {
    flexDirection: 'row',
    gap: theme.components.input.verification.gap,
    width: '100%',
  },
}));

VerificationInput.displayName = 'VerificationInput';

export default VerificationInput;
