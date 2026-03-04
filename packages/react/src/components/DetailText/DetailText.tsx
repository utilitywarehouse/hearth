'use client';

import * as React from 'react';
import type { ComponentRef } from 'react';
import { cn } from '../../helpers/cn';
import { detailTextPropDefs } from './DetailText.props';
import type { DetailTextProps } from './DetailText.props';
import { Slot } from 'radix-ui';
import { extractProps } from '../../helpers/extract-props';
import { textAlignPropDefs } from '../../props/text-align.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { textTransformPropDefs } from '../../props/text-transform.props';
import { textWrapPropDefs } from '../../props/text-wrap.props';
import { marginPropDefs } from '../../props/margin.props';

const COMPONENT_NAME = 'DetailText';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type DetailTextElement = ComponentRef<'span'>;

export const DetailText = React.forwardRef<DetailTextElement, DetailTextProps>((props, ref) => {
  const {
    className,
    asChild,
    as: Tag = 'span',
    children,
    inverted,
    ...detailTextProps
  } = extractProps(
    props,
    detailTextPropDefs,
    textAlignPropDefs,
    textTransformPropDefs,
    textWrapPropDefs,
    marginPropDefs
  );

  return (
    <Slot.Root
      ref={ref}
      className={cn(componentClassName, className)}
      data-inverted={inverted ? '' : undefined}
      {...detailTextProps}
    >
      {asChild ? children : <Tag>{children}</Tag>}
    </Slot.Root>
  );
});

DetailText.displayName = COMPONENT_NAME;
