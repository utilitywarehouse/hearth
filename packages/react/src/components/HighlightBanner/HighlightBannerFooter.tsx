import * as React from 'react';
import type { ComponentRef } from 'react';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';

const COMPONENT_NAME = 'HighlightBannerFooter';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type HighlightBannerFooterElement = ComponentRef<'div'>;

export const HighlightBannerFooter = React.forwardRef<
  HighlightBannerFooterElement,
  React.ComponentPropsWithRef<'div'>
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn(componentClassName, className)} {...props} />;
});

HighlightBannerFooter.displayName = COMPONENT_NAME;
