import { StyleSheet } from 'react-native-unistyles';
import TextProps from '../BodyText/BodyText.props';
import { BodyText } from '../BodyText';

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
    color: theme.components.text.colorSecondary,
  },
}));

export default SectionHeaderHelperText;
