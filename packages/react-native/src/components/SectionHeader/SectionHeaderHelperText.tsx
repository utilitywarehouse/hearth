import { StyleSheet } from 'react-native-unistyles';
import { BodyText } from '../BodyText';
import TextProps from '../BodyText/BodyText.props';

const SectionHeaderHelperText = ({ children, ...props }: TextProps) => {
  return (
    <BodyText size="md" {...props} style={[styles.helperText, props.style]}>
      {children}
    </BodyText>
  );
};

SectionHeaderHelperText.displayName = 'SectionHeaderHelperText';

const styles = StyleSheet.create(theme => ({
  helperText: {
    color: theme.color.text.secondary,
  },
}));

export default SectionHeaderHelperText;
