import * as React from 'react';

import clsx from 'clsx';

import { headingPropDefs, HeadingProps } from './Heading.props';
import type { ElementRef } from 'react';
import { extractProps } from '../../helpers/extract-props';
import { textAlignPropDefs } from '../../props/text-align.props';
import { Slot } from '@radix-ui/react-slot';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';

const componentName = 'Heading';
const componentClassName = withGlobalPrefix(componentName);

type HeadingElement = ElementRef<'h2'>;

/**
 * Heading renders the primary UW font, to be used for heading-level typography.
 */
export const Heading = React.forwardRef<HeadingElement, HeadingProps>(({ size, ...props }, ref) => {
  const { className, as, asChild, children, ...headingProps } = extractProps(
    { size, ...props },
    headingPropDefs,
    textAlignPropDefs
  );
  const defaultElement = 'h2';
  const Tag = as ? as : defaultElement;
  return (
    <Slot ref={ref} className={clsx(componentClassName, className)} {...headingProps}>
      {asChild ? children : <Tag>{children}</Tag>}
    </Slot>
  );
});

Heading.displayName = componentName;
