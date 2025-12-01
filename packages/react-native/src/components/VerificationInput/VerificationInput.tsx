import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Helper } from '../Helper';
import { Label } from '../Label';
import { useVerificationInput } from './useVerificationInput';
import VerificationInputProps from './VerificationInput.props';
import { VerificationInputSlot } from './VerificationInputSlot';

const VerificationInput = ({
  value = '',
  onChangeText,
  label,
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
    <View style={[styles.root, style]} {...props}>
      {!!label && (
        <Label disabled={disabled} style={styles.label}>
          {label}
        </Label>
      )}

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

      {!!helperText && (
        <Helper disabled={disabled} icon={helperIcon} text={helperText} style={styles.helper} />
      )}
      {validationStatus === 'invalid' && !!invalidText && (
        <Helper
          validationStatus="invalid"
          text={invalidText}
          disabled={disabled}
          style={styles.helper}
        />
      )}
      {validationStatus === 'valid' && !!validText && (
        <Helper
          validationStatus="valid"
          text={validText}
          disabled={disabled}
          style={styles.helper}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  root: {
    gap: theme.components.input.verification.gap,
    width: '100%',
    maxWidth: theme.components.input.maxWidth,
  },
  label: {
    marginBottom: theme.components.input.label.gap,
  },
  slotsContainer: {
    flexDirection: 'row',
    gap: theme.components.input.verification.gap,
    width: '100%',
  },
  helper: {
    marginTop: theme.components.input.verification.gap,
  },
}));

VerificationInput.displayName = 'VerificationInput';

export default VerificationInput;
