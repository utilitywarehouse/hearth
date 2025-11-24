import * as React from 'react';
import type { FC } from 'react';

import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Flex } from '../Flex/Flex';
import { HighlightBannerContentProps } from './HighlightBannerContent.props';

const COMPONENT_NAME = 'HighlightBannerContent';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const HighlightBannerContent: FC<HighlightBannerContentProps> = ({
  className,
  ...props
}) => {
  return <Flex className={clsx(componentClassName, className)} {...props} />;
};

HighlightBannerContent.displayName = COMPONENT_NAME;
