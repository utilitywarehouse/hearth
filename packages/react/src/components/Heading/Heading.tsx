import * as React from 'react';

import clsx from 'clsx';

import { headingPropDefs, HeadingProps } from './Heading.props';
import type { ElementRef } from 'react';
import { extractProps } from '../../helpers/extract-props';
import { textAlignPropDefs } from '../../props/text-align.props';
import { Slot } from '@radix-ui/react-slot';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { textTransformPropDefs } from '../../props/text-transform.props';
import { textWrapPropDefs } from '../../props/text-wrap.props';

const componentName = 'Heading';
const componentClassName = withGlobalPrefix(componentName);

type HeadingElement = ElementRef<'h2'>;

export const Heading = React.forwardRef<HeadingElement, HeadingProps>(({ size, ...props }, ref) => {
  const { className, as, asChild, children, ...headingProps } = extractProps(
    { size, ...props },
    headingPropDefs,
    textAlignPropDefs,
    textTransformPropDefs,
    textWrapPropDefs
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
