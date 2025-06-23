import { StyleSheet } from 'react-native-unistyles';

import TextProps from '../../BodyText/BodyText.props';
import { BodyText } from '../../BodyText';

const AccordionHeadingHelperText = ({ children, ...props }: TextProps) => {
  return (
    <BodyText size="md" {...props} style={[styles.helperText, props.style]}>
      {children}
    </BodyText>
  );
};

const styles = StyleSheet.create(theme => ({
  helperText: {
    color: theme.components.text.colorSecondary,
  },
}));

AccordionHeadingHelperText.displayName = 'AccordionHeadingHelperText';

export default AccordionHeadingHelperText;
