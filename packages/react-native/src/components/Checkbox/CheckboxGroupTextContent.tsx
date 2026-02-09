import { Flex } from '../Flex';
import FlexProps from '../Flex/Flex.props';

const CheckboxGroupTextContent = ({ children, ...props }: FlexProps) => {
  return (
    <Flex direction="column" spacing="none" {...props}>
      {children}
    </Flex>
  );
};

CheckboxGroupTextContent.displayName = 'CheckboxGroupTextContent';

export default CheckboxGroupTextContent;
