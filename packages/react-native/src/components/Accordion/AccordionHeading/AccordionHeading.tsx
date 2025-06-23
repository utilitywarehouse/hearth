import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import AccordionHeadingTitle from './AccordionHeadingTitle';
import AccordionHeadingHelperText from './AccordionHeadingHelperText';
import AccordionHeadingProps from './AccordionHeading.props';
import AccordionHeadingTextContent from './AccordionHeadingTextContent';

const AccordionHeading = ({
  text,
  helperText,
  children,
  style,

  ...props
}: AccordionHeadingProps) => (
  <View {...props} style={[styles.container, style]}>
    {children ? (
      children
    ) : (
      <AccordionHeadingTextContent>
        <AccordionHeadingTitle>{text}</AccordionHeadingTitle>
        {!!helperText && <AccordionHeadingHelperText>{helperText}</AccordionHeadingHelperText>}
      </AccordionHeadingTextContent>
    )}
  </View>
);

const styles = StyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    gap: theme.components.accordion.heading.gap,
    paddingBottom: theme.components.accordion.gap,
  },
}));

AccordionHeading.displayName = 'AccordionHeading';

export default AccordionHeading;
