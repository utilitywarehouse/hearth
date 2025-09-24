import * as React from 'react';
import clsx from 'clsx';
import { StrongProps } from './Strong.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Slot } from 'radix-ui';
import type { ElementRef } from 'react';
import { extractProps } from '../../helpers/extract-props';
import { textAlignPropDefs } from '../../props/text-align.props';
import { textTransformPropDefs } from '../../props/text-transform.props';
import { textWrapPropDefs } from '../../props/text-wrap.props';
import { marginPropDefs } from '../../props/margin.props';

const COMPONENT_NAME = 'Strong';
const { displayName, componentClassName } = withGlobalPrefix(COMPONENT_NAME);

type StrongElement = ElementRef<'strong'>;

export const Strong = React.forwardRef<StrongElement, StrongProps>((props, ref) => {
  const { className, asChild, children, truncate, ...strongProps } = extractProps(
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
      {...strongProps}
    >
      {asChild ? children : <strong>{children}</strong>}
    </Slot.Root>
  );
});

Strong.displayName = displayName;
