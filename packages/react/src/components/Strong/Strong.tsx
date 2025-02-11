import * as React from 'react';

import clsx from 'clsx';

import { StrongProps } from './Strong.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Slot } from '@radix-ui/react-slot';

import type { ElementRef } from 'react';
import { extractProps } from '../../helpers/extract-props';
import { textAlignPropDefs } from '../../props/text-align.props';
import { textTransformPropDefs } from '../../props/text-transform.props';

const componentName = 'Strong';
const componentClassName = withGlobalPrefix(componentName);

type StrongElement = ElementRef<'strong'>;

export const Strong = React.forwardRef<StrongElement, StrongProps>((props, ref) => {
  const { className, asChild, children, truncate, ...strongProps } = extractProps(
    props,
    textAlignPropDefs,
    textTransformPropDefs
  );
  return (
    <Slot
      ref={ref}
      className={clsx(componentClassName, className)}
      data-truncate={truncate ? '' : undefined}
      {...strongProps}
    >
      {asChild ? children : <strong>{children}</strong>}
    </Slot>
  );
});

Strong.displayName = componentName;
