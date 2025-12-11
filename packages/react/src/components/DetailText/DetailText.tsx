'use client';

import clsx from 'clsx';
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

export const DetailText = (props: DetailTextProps) => {
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
      className={clsx(componentClassName, className)}
      data-inverted={inverted ? '' : undefined}
      {...detailTextProps}
    >
      {asChild ? children : <Tag>{children}</Tag>}
    </Slot.Root>
  );
};

DetailText.displayName = COMPONENT_NAME;
