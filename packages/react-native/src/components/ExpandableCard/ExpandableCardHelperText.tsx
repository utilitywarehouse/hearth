import { TextProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { BodyText } from '../BodyText';

const ExpandableCardHelperText = ({ children, ...props }: TextProps) => {
  return (
    <BodyText size="md" {...props} style={[styles.text, props.style]}>
      {children}
    </BodyText>
  );
};

ExpandableCardHelperText.displayName = 'ExpandableCardHelperText';

const styles = StyleSheet.create(theme => ({
  text: {
    color: theme.color.text.secondary,
  },
}));

export default ExpandableCardHelperText;
