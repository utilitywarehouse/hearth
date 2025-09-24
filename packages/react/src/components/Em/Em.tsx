import * as React from 'react';

import clsx from 'clsx';

import { EmProps } from './Em.props';
import { withClassnameGlobalPrefix } from '../../helpers/with-global-prefix';
import { Slot } from 'radix-ui';
import type { ElementRef } from 'react';
import { extractProps } from '../../helpers/extract-props';
import { textAlignPropDefs } from '../../props/text-align.props';
import { textTransformPropDefs } from '../../props/text-transform.props';
import { textWrapPropDefs } from '../../props/text-wrap.props';
import { marginPropDefs } from '../../props/margin.props';

const componentName = 'Em';
const componentClassName = withClassnameGlobalPrefix(componentName);

type EmElement = ElementRef<'em'>;

export const Em = React.forwardRef<EmElement, EmProps>((props, ref) => {
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
      className={clsx(componentClassName, className)}
      data-truncate={truncate ? '' : undefined}
      {...emProps}
    >
      {asChild ? children : <em>{children}</em>}
    </Slot.Root>
  );
});

Em.displayName = componentName;
