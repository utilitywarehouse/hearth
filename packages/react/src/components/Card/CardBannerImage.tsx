import type { ComponentRef } from 'react';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Flex } from '../Flex/Flex';
import type { FlexProps } from '../Flex/Flex.props';
import * as React from 'react';

const COMPONENT_NAME = 'CardBannerImage';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type CardBannerImageElement = ComponentRef<'div'>;

export const CardBannerImage = React.forwardRef<CardBannerImageElement, FlexProps>(
  ({ className, ...props }, ref) => {
    return <Flex ref={ref} className={cn(componentClassName, className)} {...props} />;
  }
);

CardBannerImage.displayName = COMPONENT_NAME;
