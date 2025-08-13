import { StyleSheet } from 'react-native-unistyles';
import { BodyText } from '../BodyText';
import TextProps from '../BodyText/BodyText.props';
import { useHelperContext } from './HelperContext';

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
    color: theme.color.text.secondary,
    variants: {
      validationStatus: {
        valid: {
          color: theme.color.feedback.positive.foreground.subtle,
        },
        invalid: {
          color: theme.color.feedback.danger.foreground.subtle,
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
