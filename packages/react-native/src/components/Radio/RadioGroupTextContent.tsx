import { Flex } from '../Flex';
import FlexProps from '../Flex/Flex.props';

const RadioGroupTextContent = ({ children, ...props }: FlexProps) => {
  return (
    <Flex direction="column" spacing="none" {...props}>
      {children}
    </Flex>
  );
};

RadioGroupTextContent.displayName = 'RadioGroupTextContent';

export default RadioGroupTextContent;
