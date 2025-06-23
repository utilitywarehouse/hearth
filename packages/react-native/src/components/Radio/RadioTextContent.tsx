import FlexProps from '../Flex/Flex.props';
import { Flex } from '../Flex';

const RadioTextContent = ({ children, ...props }: FlexProps) => {
  return (
    <Flex direction="column" space="none" {...props}>
      {children}
    </Flex>
  );
};

RadioTextContent.displayName = 'RadioTextContent';

export default RadioTextContent;
