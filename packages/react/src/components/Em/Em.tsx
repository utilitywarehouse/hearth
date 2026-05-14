'use client';

import { forwardRef } from 'react';
import type { ComponentRef } from 'react';
import { cn } from '../../helpers/cn';
import type { EmProps } from './Em.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Slot } from 'radix-ui';
import { extractProps } from '../../helpers/extract-props';
import { textAlignPropDefs } from '../../props/text-align.props';
import { textTransformPropDefs } from '../../props/text-transform.props';
import { textWrapPropDefs } from '../../props/text-wrap.props';
import { marginPropDefs } from '../../props/margin.props';

const COMPONENT_NAME = 'Em';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type EmElement = ComponentRef<'em'>;

export const Em = forwardRef<EmElement, EmProps>((props, ref) => {
  const { className, asChild, children, truncate, ...emProps } = extractProps(
    props,
    textAlignPropDefs,
    textTransformPropDefs,
    textWrapPropDefs,
    marginPropDefs
  );
  return (
    <Slot.Root
      ref={ref}
      className={cn(componentClassName, className)}
      data-truncate={truncate ? '' : undefined}
      data-testid={componentClassName}
      {...emProps}
    >
      {asChild ? children : <em>{children}</em>}
    </Slot.Root>
  );
});

Em.displayName = COMPONENT_NAME;
