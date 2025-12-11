'use client';

import clsx from 'clsx';
import { headingPropDefs } from './Heading.props';
import type { HeadingProps } from './Heading.props';
import { extractProps } from '../../helpers/extract-props';
import { textAlignPropDefs } from '../../props/text-align.props';
import { Slot } from 'radix-ui';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { textTransformPropDefs } from '../../props/text-transform.props';
import { textWrapPropDefs } from '../../props/text-wrap.props';
import { marginPropDefs } from '../../props/margin.props';

const COMPONENT_NAME = 'Heading';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const Heading = ({ size, as: Tag = 'h2', ...props }: HeadingProps) => {
  const { className, asChild, inverted, children, ...headingProps } = extractProps(
    { size, ...props },
    headingPropDefs,
    textAlignPropDefs,
    textTransformPropDefs,
    textWrapPropDefs,
    marginPropDefs
  );

  return (
    <Slot.Root
      className={clsx(componentClassName, className)}
      data-inverted={inverted ? '' : undefined}
      {...headingProps}
    >
      {asChild ? children : <Tag>{children}</Tag>}
    </Slot.Root>
  );
};

Heading.displayName = COMPONENT_NAME;
