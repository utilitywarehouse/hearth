import { StyleSheet } from 'react-native-unistyles';
import LabelProps from './Label.props';
import { BodyText } from '../BodyText';

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
    color: theme.components.text.color,
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
