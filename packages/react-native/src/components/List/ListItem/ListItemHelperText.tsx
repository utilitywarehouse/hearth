import { StyleSheet } from 'react-native-unistyles';
import { BodyText, BodyTextProps } from '../../BodyText';

const ListItemHelperText = ({ children, style, ...props }: BodyTextProps) => {
  return (
    <BodyText size="md" style={[styles.text, style]} {...props}>
      {children}
    </BodyText>
  );
};

ListItemHelperText.displayName = 'ListItemHelperText';

const styles = StyleSheet.create(theme => ({
  text: {
    color: theme.color.text.secondary,
  },
}));

export default ListItemHelperText;
