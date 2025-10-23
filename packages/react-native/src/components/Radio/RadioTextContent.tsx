import { StyleSheet } from 'react-native-unistyles';
import { Flex } from '../Flex';
import FlexProps from '../Flex/Flex.props';

const RadioTextContent = ({ children, style, ...props }: FlexProps) => {
  return (
    <Flex direction="column" space="none" style={[styles.content, style]} {...props}>
      {children}
    </Flex>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexShrink: 1,
  },
});

RadioTextContent.displayName = 'RadioTextContent';

export default RadioTextContent;
