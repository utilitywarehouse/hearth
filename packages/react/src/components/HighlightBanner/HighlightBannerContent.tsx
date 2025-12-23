import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Flex } from '../Flex/Flex';
import type { FlexProps } from '../Flex/Flex.props';

const COMPONENT_NAME = 'HighlightBannerContent';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const HighlightBannerContent = ({ className, ...props }: FlexProps) => {
  return <Flex className={cn(componentClassName, className)} {...props} />;
};

HighlightBannerContent.displayName = COMPONENT_NAME;
