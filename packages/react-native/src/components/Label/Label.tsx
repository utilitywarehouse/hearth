import { StyleSheet } from 'react-native-unistyles';
import { BodyText } from '../BodyText';
import LabelProps from './Label.props';

const Label = ({ children, nested, disabled, style, ...props }: LabelProps) => {
  styles.useVariants({ disabled });
  return (
    <BodyText
      size="md"
      weight={nested ? 'regular' : 'semibold'}
      style={[styles.text, style]}
      {...props}
    >
      {children}
    </BodyText>
  );
};

Label.displayName = 'Label';

const styles = StyleSheet.create(theme => ({
  text: {
    color: theme.color.text.primary,
    variants: {
      disabled: {
        true: {
          opacity: theme.opacity.disabled,
        },
      },
    },
  },
}));

export default Label;
