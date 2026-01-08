import { StyleSheet } from 'react-native-unistyles';
import { BodyText, BodyTextProps } from '../../BodyText';

const ListItemHelperText = ({ children, ...props }: BodyTextProps) => {
  return (
    <BodyText size="md" {...props} style={[styles.text, props.style]}>
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
