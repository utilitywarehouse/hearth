'use client';

import { forwardRef } from 'react';
import type { ComponentRef } from 'react';
import { cn } from '../../helpers/cn';
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

type StrongElement = ComponentRef<'strong'>;

/**
 * Use Strong to mark up text of strong importance, seriousness, or urgency
 * within a larger body of text — it renders a `strong` element by default,
 * and should be wrapped in a BodyText component so it inherits its styles.
 * For stress emphasis rather than strong importance, use Em instead.
 *
 * @summary Inline text of strong importance, rendered as a `strong` element.
 */
export const Strong = forwardRef<StrongElement, StrongProps>((props, ref) => {
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
      className={cn(componentClassName, className)}
      data-truncate={truncate ? '' : undefined}
      data-testid={componentClassName}
      {...strongProps}
    >
      {asChild ? children : <strong>{children}</strong>}
    </Slot.Root>
  );
});

Strong.displayName = COMPONENT_NAME;
