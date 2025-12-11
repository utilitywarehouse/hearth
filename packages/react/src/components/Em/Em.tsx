'use client';

import clsx from 'clsx';
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

export const Em = (props: EmProps) => {
  const { className, asChild, children, truncate, ...emProps } = extractProps(
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
      {...emProps}
    >
      {asChild ? children : <em>{children}</em>}
    </Slot.Root>
  );
};

Em.displayName = COMPONENT_NAME;
