import { StyleSheet } from 'react-native-unistyles';

import { BodyText } from '../../BodyText';
import TextProps from '../../BodyText/BodyText.props';

const AccordionHeadingHelperText = ({ children, ...props }: TextProps) => {
  return (
    <BodyText size="md" {...props} style={[styles.helperText, props.style]}>
      {children}
    </BodyText>
  );
};

const styles = StyleSheet.create(theme => ({
  helperText: {
    color: theme.color.text.secondary,
  },
}));

AccordionHeadingHelperText.displayName = 'AccordionHeadingHelperText';

export default AccordionHeadingHelperText;
