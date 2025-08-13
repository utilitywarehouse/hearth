import { StyleSheet } from 'react-native-unistyles';
import { BodyText } from '../../BodyText';
import TextProps from '../../BodyText/BodyText.props';

const ListHeadingHelperText = ({ children, ...props }: TextProps) => {
  return (
    <BodyText size="md" {...props} style={[styles.helperText, props.style]}>
      {children}
    </BodyText>
  );
};

ListHeadingHelperText.displayName = 'ListHeadingHelperText';

const styles = StyleSheet.create(theme => ({
  helperText: {
    color: theme.color.text.secondary,
  },
}));

export default ListHeadingHelperText;
