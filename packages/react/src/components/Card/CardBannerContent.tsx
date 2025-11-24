import * as React from 'react';
import type { FC } from 'react';

import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Flex } from '../Flex/Flex';
import { Heading } from '../Heading/Heading';
import { BodyText } from '../BodyText/BodyText';
import { CardBannerContentProps } from './CardBannerContent.props';

const COMPONENT_NAME = 'CardBannerContent';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const CardBannerContent: FC<CardBannerContentProps> = ({
  heading,
  description,
  className,
  children,
  textAlign,
  ...props
}) => {
  return (
    <Flex
      className={clsx(componentClassName, className)}
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
