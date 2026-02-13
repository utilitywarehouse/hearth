import { StyleSheet } from 'react-native-unistyles';
import { Flex } from '../Flex';
import FlexProps from '../Flex/Flex.props';

const RadioTextContent = ({ children, style, ...props }: FlexProps) => {
  return (
    <Flex direction="column" spacing="none" style={[styles.content, style]} {...props}>
      {children}
    </Flex>
  );
};

const styles = StyleSheet.create({
  content: {
    flexShrink: 1,
  },
});

RadioTextContent.displayName = 'RadioTextContent';

export default RadioTextContent;
