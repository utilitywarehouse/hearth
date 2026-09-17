'use client';

import { forwardRef } from 'react';
import type { ComponentRef } from 'react';
import { cn } from '../../helpers/cn';
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

type HeadingElement = ComponentRef<'h2'>;

/**
 * Use Heading for section and page headings — it renders an `h2` element by
 * default, with non-responsive `size` steps that are already responsive
 * internally. Use the `as` prop to render the semantically correct heading
 * level (`h1`–`h4`) for the document outline, independent of visual size.
 * For body or detail copy, use BodyText or DetailText instead.
 *
 * @summary Section and page heading text, rendered as an `h1`–`h4` element.
 */
export const Heading = forwardRef<HeadingElement, HeadingProps>(
  ({ size, as: Tag = 'h2', ...props }, ref) => {
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
        ref={ref}
        className={cn(componentClassName, className)}
        data-inverted={inverted ? '' : undefined}
        data-testid={componentClassName}
        {...headingProps}
      >
        {asChild ? children : <Tag>{children}</Tag>}
      </Slot.Root>
    );
  }
);

Heading.displayName = COMPONENT_NAME;
