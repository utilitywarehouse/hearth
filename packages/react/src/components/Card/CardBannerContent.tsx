import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Flex } from '../Flex/Flex';
import { Heading } from '../Heading/Heading';
import { BodyText } from '../BodyText/BodyText';
import type { CardBannerContentProps } from './CardBannerContent.props';
import { forwardRef } from 'react';
import type { ComponentRef } from 'react';

const COMPONENT_NAME = 'CardBannerContent';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type CardBannerContentElement = ComponentRef<'div'>;

/**
 * Use CardBannerContent to lay out the heading and description text within a
 * Card banner, alongside any additional content such as actions. Pair it
 * with `CardBannerImage` for banners that include an image or illustration.
 *
 * @summary Text content layout for a Card banner.
 */
export const CardBannerContent = forwardRef<CardBannerContentElement, CardBannerContentProps>(
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
