import { StyleSheet } from 'react-native-unistyles';
import { Flex } from '../Flex';
import FlexProps from '../Flex/Flex.props';

const CheckboxTextContent = ({ children, ...props }: FlexProps) => {
  return (
    <Flex style={[styles.content, props.style]} direction="column" space="none" {...props}>
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

CheckboxTextContent.displayName = 'CheckboxTextContent';

export default CheckboxTextContent;
