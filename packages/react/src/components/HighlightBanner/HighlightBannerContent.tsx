import { forwardRef } from 'react';
import type { ComponentRef } from 'react';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Flex } from '../Flex/Flex';
import type { FlexProps } from '../Flex/Flex.props';

const COMPONENT_NAME = 'HighlightBannerContent';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type HighlightBannerContentElement = ComponentRef<'div'>;

export const HighlightBannerContent = forwardRef<HighlightBannerContentElement, FlexProps>(
  ({ className, ...props }, ref) => {
    return <Flex ref={ref} className={cn(componentClassName, className)} {...props} />;
  }
);

HighlightBannerContent.displayName = COMPONENT_NAME;
