import { TextProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { BodyText } from '../../BodyText';

const ListItemHelperText = ({ children, ...props }: TextProps) => {
  return (
    <BodyText size="md" {...props} style={[styles.text, props.style]}>
      {children}
    </BodyText>
  );
};

ListItemHelperText.displayName = 'ListItemHelperText';

const styles = StyleSheet.create(theme => ({
  text: {
    color: theme.components.text.colorSecondary,
  },
}));

export default ListItemHelperText;
