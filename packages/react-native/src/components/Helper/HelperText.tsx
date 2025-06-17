import { StyleSheet } from 'react-native-unistyles';
import TextProps from '../BodyText/BodyText.props';
import { useHelperContext } from './HelperContext';
import { BodyText } from '../BodyText';

const HelperText = (props: TextProps) => {
  const { validationStatus, disabled } = useHelperContext();
  styles.useVariants({ validationStatus, disabled });

  return (
    <BodyText
      size={validationStatus !== 'initial' ? 'sm' : 'md'}
      style={[styles.text, props.style]}
      {...props}
    >
      {props.children}
    </BodyText>
  );
};

HelperText.displayName = 'HelperText';

const styles = StyleSheet.create(theme => ({
  text: {
    color: theme.components.text.colorSecondary,
    variants: {
      validationStatus: {
        valid: {
          color: theme.components.text.colorValid,
        },
        invalid: {
          color: theme.components.text.colorInvalid,
        },
        initial: {},
      },
      disabled: {
        true: {
          opacity: theme.opacity.disabled,
        },
      },
    },
  },
}));

export default HelperText;
