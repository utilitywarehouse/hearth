import { StyleSheet } from 'react-native-unistyles';
import TextProps from '../../BodyText/BodyText.props';
import { BodyText } from '../../BodyText';

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
    color: theme.components.text.colorSecondary,
  },
}));

export default ListHeadingHelperText;
