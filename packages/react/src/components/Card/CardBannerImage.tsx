import * as React from 'react';
import type { FC } from 'react';

import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Flex } from '../Flex/Flex';
import { CardBannerImageProps } from './CardBannerImage.props';

const COMPONENT_NAME = 'CardBannerImage';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const CardBannerImage: FC<CardBannerImageProps> = ({ className, ...props }) => {
  return <Flex className={clsx(componentClassName, className)} {...props} />;
};

CardBannerImage.displayName = COMPONENT_NAME;
