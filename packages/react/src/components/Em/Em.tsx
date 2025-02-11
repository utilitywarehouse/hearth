import * as React from 'react';

import clsx from 'clsx';

import { EmProps } from './Em.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Slot } from '@radix-ui/react-slot';

import type { ElementRef } from 'react';
import { extractProps } from '../../helpers/extract-props';
import { textAlignPropDefs } from '../../props/text-align.props';
import { textTransformPropDefs } from '../../props/text-transform.props';
import { textWrapPropDefs } from '../../props/text-wrap.props';

const componentName = 'Em';
const componentClassName = withGlobalPrefix(componentName);

type EmElement = ElementRef<'em'>;

export const Em = React.forwardRef<EmElement, EmProps>((props, ref) => {
  const { className, asChild, children, truncate, ...emProps } = extractProps(
    props,
    textAlignPropDefs,
    textTransformPropDefs,
    textWrapPropDefs
  );
  return (
    <Slot
      ref={ref}
      className={clsx(componentClassName, className)}
      data-truncate={truncate ? '' : undefined}
      {...emProps}
    >
      {asChild ? children : <em>{children}</em>}
    </Slot>
  );
});

Em.displayName = componentName;
