import FlexProps from '../Flex/Flex.props';
import { Flex } from '../Flex';

const CheckboxTextContent = ({ children, ...props }: FlexProps) => {
  return (
    <Flex direction="column" space="none" {...props}>
      {children}
    </Flex>
  );
};

CheckboxTextContent.displayName = 'CheckboxTextContent';

export default CheckboxTextContent;
