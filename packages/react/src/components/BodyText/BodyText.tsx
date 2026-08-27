'use client';

import { cn } from '../../helpers/cn';
import { bodyTextPropDefs } from './BodyText.props';
import type { BodyTextProps } from './BodyText.props';
import { Slot } from 'radix-ui';
import { extractProps } from '../../helpers/extract-props';
import { textAlignPropDefs } from '../../props/text-align.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { textTransformPropDefs } from '../../props/text-transform.props';
import { textWrapPropDefs } from '../../props/text-wrap.props';
import { marginPropDefs } from '../../props/margin.props';
import { colorPropDefs } from '../../props/color.props';
import type { ComponentRef } from 'react';
import { forwardRef } from 'react';

const COMPONENT_NAME = 'BodyText';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type BodyTextElement = ComponentRef<'span'>;

/**
 * Use BodyText for the main paragraph or body copy of a page — it renders a
 * `p` element by default, with responsive `size` and `weight` props.
 * For smaller, secondary or supporting text, use DetailText instead.
 * For heading-level text, use Heading instead. For inline emphasis or strong
 * importance within a block of text, use Em or Strong instead.
 *
 * @summary The default component for body copy and paragraph text.
 */
export const BodyText = forwardRef<BodyTextElement, BodyTextProps>((props, ref) => {
  const {
    className,
    asChild,
    as: Tag = 'p',
    children,
    truncate,
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
      className={cn(componentClassName, className)}
      data-truncate={truncate ? '' : undefined}
      data-testid={componentClassName}
      {...bodyTextProps}
    >
      {asChild ? children : <Tag>{children}</Tag>}
    </Slot.Root>
  );
});

BodyText.displayName = COMPONENT_NAME;
