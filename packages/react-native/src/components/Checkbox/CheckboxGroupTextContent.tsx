import FlexProps from '../Flex/Flex.props';
import { Flex } from '../Flex';

const CheckboxGroupTextContent = ({ children, ...props }: FlexProps) => {
  return (
    <Flex direction="column" space="none" {...props}>
      {children}
    </Flex>
  );
};

CheckboxGroupTextContent.displayName = 'CheckboxGroupTextContent';

export default CheckboxGroupTextContent;
