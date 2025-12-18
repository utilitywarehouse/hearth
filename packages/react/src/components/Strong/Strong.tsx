'use client';

import clsx from 'clsx';
import type { StrongProps } from './Strong.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Slot } from 'radix-ui';
import { extractProps } from '../../helpers/extract-props';
import { textAlignPropDefs } from '../../props/text-align.props';
import { textTransformPropDefs } from '../../props/text-transform.props';
import { textWrapPropDefs } from '../../props/text-wrap.props';
import { marginPropDefs } from '../../props/margin.props';

const COMPONENT_NAME = 'Strong';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const Strong = (props: StrongProps) => {
  const { className, asChild, children, truncate, ...strongProps } = extractProps(
    props,
    textAlignPropDefs,
    textTransformPropDefs,
    textWrapPropDefs,
    marginPropDefs
  );
  return (
    <Slot.Root
      className={clsx(componentClassName, className)}
      data-truncate={truncate ? '' : undefined}
      {...strongProps}
    >
      {asChild ? children : <strong>{children}</strong>}
    </Slot.Root>
  );
};

Strong.displayName = COMPONENT_NAME;
