import * as React from 'react';

import clsx from 'clsx';

import { headingPropDefs, HeadingProps } from './Heading.props';
import type { ElementRef } from 'react';
import { extractProps } from '../../helpers/extract-props';
import { textAlignPropDefs } from '../../props/text-align.props';
import { Slot } from 'radix-ui';
import { withClassnameGlobalPrefix } from '../../helpers/with-global-prefix';
import { textTransformPropDefs } from '../../props/text-transform.props';
import { textWrapPropDefs } from '../../props/text-wrap.props';
import { marginPropDefs } from '../../props/margin.props';

const componentName = 'Heading';
const componentClassName = withClassnameGlobalPrefix(componentName);

type HeadingElement = ElementRef<'h2'>;

export const Heading = React.forwardRef<HeadingElement, HeadingProps>(({ size, ...props }, ref) => {
  const { className, as, asChild, inverted, children, ...headingProps } = extractProps(
    { size, ...props },
    headingPropDefs,
    textAlignPropDefs,
    textTransformPropDefs,
    textWrapPropDefs,
    marginPropDefs
  );
  const defaultElement = 'h2';
  const Tag = as ? as : defaultElement;
  return (
    <Slot.Root
      ref={ref}
      className={clsx(componentClassName, className)}
      data-inverted={inverted ? '' : undefined}
      {...headingProps}
    >
      {asChild ? children : <Tag>{children}</Tag>}
    </Slot.Root>
  );
});

Heading.displayName = componentName;
