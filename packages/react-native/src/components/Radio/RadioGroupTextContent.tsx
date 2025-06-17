import FlexProps from '../Flex/Flex.props';
import { Flex } from '../Flex';

const RadioGroupTextContent = ({ children, ...props }: FlexProps) => {
  return (
    <Flex direction="column" space="none" {...props}>
      {children}
    </Flex>
  );
};

RadioGroupTextContent.displayName = 'RadioGroupTextContent';

export default RadioGroupTextContent;
