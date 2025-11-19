import { StyleSheet } from 'react-native-unistyles';
import { Label } from '../Label';
import LabelProps from '../Label/Label.props';

const RadioCardLabel = ({ children, style, ...props }: LabelProps) => (
  <Label {...props} style={[styles.label, style]}>
    {children}
  </Label>
);

const styles = StyleSheet.create({
  label: {
    flexShrink: 1,
  },
});

RadioCardLabel.displayName = 'RadioCardLabel';

export default RadioCardLabel;
