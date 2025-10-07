import * as React from 'react';
import type { ElementRef } from 'react';
import clsx from 'clsx';
import { bodyTextPropDefs, BodyTextProps } from './BodyText.props';
import { Slot } from 'radix-ui';
import { extractProps } from '../../helpers/extract-props';
import { textAlignPropDefs } from '../../props/text-align.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { textTransformPropDefs } from '../../props/text-transform.props';
import { textWrapPropDefs } from '../../props/text-wrap.props';
import { marginPropDefs } from '../../props/margin.props';
import { colorPropDefs } from '../../props/color.props';

const COMPONENT_NAME = 'BodyText';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type BodyTextElement = ElementRef<'span'>;

export const BodyText = React.forwardRef<BodyTextElement, BodyTextProps>((props, ref) => {
  const {
    className,
    asChild,
    as: Tag = 'p',
    children,
    truncate,
    inverted,
    ...bodyTextProps
  } = extractProps(
    props,
    bodyTextPropDefs,
    colorPropDefs,
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
      data-inverted={inverted ? '' : undefined}
      {...bodyTextProps}
    >
      {asChild ? children : <Tag>{children}</Tag>}
    </Slot.Root>
  );
});

BodyText.displayName = COMPONENT_NAME;
