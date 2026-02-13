import { StyleSheet } from 'react-native-unistyles';
import { Flex } from '../Flex';
import FlexProps from '../Flex/Flex.props';

const CheckboxTextContent = ({ children, style, ...props }: FlexProps) => {
  return (
    <Flex style={[styles.content, style]} direction="column" spacing="none" {...props}>
      {children}
    </Flex>
  );
};

const styles = StyleSheet.create({
  content: {
    flexShrink: 1,
  },
});

CheckboxTextContent.displayName = 'CheckboxTextContent';

export default CheckboxTextContent;
