import { TextProps } from 'react-native';
import { BodyText } from '../../components/BodyText';
import { StyleSheet } from 'react-native-unistyles';

const AccordionTitleText = ({ children, style, ...props }: TextProps) => (
  <BodyText weight="semibold" style={[styles.title, style]} {...props}>
    {children}
  </BodyText>
);

const styles = StyleSheet.create({
  title: {
    flex: 1,
  },
});

AccordionTitleText.displayName = 'AccordionTitleText';

export default AccordionTitleText;
