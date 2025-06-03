import * as React from 'react';
import type { ElementRef } from 'react';
import clsx from 'clsx';
import { detailTextPropDefs, DetailTextProps } from './DetailText.props';
import { Slot } from 'radix-ui';
import { extractProps } from '../../helpers/extract-props';
import { textAlignPropDefs } from '../../props/text-align.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { textTransformPropDefs } from '../../props/text-transform.props';
import { textWrapPropDefs } from '../../props/text-wrap.props';
import { marginPropDefs } from '../../props/margin.props';

const componentName = 'DetailText';
const componentClassName = withGlobalPrefix(componentName);

type DetailTextElement = ElementRef<'span'>;

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
      className={clsx(componentClassName, className)}
      data-inverted={inverted ? '' : undefined}
      {...(detailTextProps as Slot.SlotProps)}
    >
      {asChild ? children : <Tag>{children}</Tag>}
    </Slot.Root>
  );
});

DetailText.displayName = componentName;
