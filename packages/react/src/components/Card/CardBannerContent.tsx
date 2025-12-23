import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Flex } from '../Flex/Flex';
import { Heading } from '../Heading/Heading';
import { BodyText } from '../BodyText/BodyText';
import type { CardBannerContentProps } from './CardBannerContent.props';

const COMPONENT_NAME = 'CardBannerContent';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const CardBannerContent = ({
  heading,
  description,
  className,
  children,
  textAlign,
  ...props
}: CardBannerContentProps) => {
  return (
    <Flex
      className={cn(componentClassName, className)}
      direction="column"
      spacing="lg"
      {...props}
    >
      <Flex spacing="sm" direction="column">
        <Heading size="sm" textAlign={textAlign}>
          {heading}
        </Heading>
        <BodyText size="md" textAlign={textAlign}>
          {description}
        </BodyText>
      </Flex>
      {children}
    </Flex>
  );
};

CardBannerContent.displayName = COMPONENT_NAME;
