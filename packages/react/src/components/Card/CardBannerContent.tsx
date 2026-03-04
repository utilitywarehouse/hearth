import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Flex } from '../Flex/Flex';
import { Heading } from '../Heading/Heading';
import { BodyText } from '../BodyText/BodyText';
import type { CardBannerContentProps } from './CardBannerContent.props';
import type { ComponentRef } from 'react';
import * as React from 'react';

const COMPONENT_NAME = 'CardBannerContent';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type CardBannerContentElement = ComponentRef<'div'>;

export const CardBannerContent = React.forwardRef<CardBannerContentElement, CardBannerContentProps>(
  ({ heading, description, className, children, textAlign, ...props }, ref) => {
    return (
      <Flex
        ref={ref}
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
  }
);

CardBannerContent.displayName = COMPONENT_NAME;
