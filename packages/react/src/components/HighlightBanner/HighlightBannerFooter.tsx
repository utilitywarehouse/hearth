import * as React from 'react';
import type { FC } from 'react';

import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { HighlightBannerFooterProps } from './HighlightBannerFooter.props';

const COMPONENT_NAME = 'HighlightBannerFooter';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const HighlightBannerFooter: FC<HighlightBannerFooterProps> = ({ className, ...props }) => {
  return <div className={clsx(componentClassName, className)} {...props} />;
};

HighlightBannerFooter.displayName = COMPONENT_NAME;
