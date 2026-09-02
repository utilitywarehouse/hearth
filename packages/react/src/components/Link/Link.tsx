'use client';

import { cn } from '../../helpers/cn';
import { Slot } from 'radix-ui';
import type { LinkProps } from './Link.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { textTransformPropDefs } from '../../props/text-transform.props';
import { OpenSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import type { ComponentRef } from 'react';
import { forwardRef } from 'react';

const COMPONENT_NAME = 'Link';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type LinkElement = ComponentRef<'a'>;

/**
 * Use Link to navigate a user to another page or website, to another place
 * on the same page, or to open a resource in a new tab. Renders a semantic
 * `a` element by default — use `asChild` to render as a different element
 * (e.g. a framework's own Link component) while keeping Link's styling and behavior.
 *
 * For links within a body of text, use InlineLink instead.
 *
 * @summary A navigational link, rendered as an anchor by default.
 */
export const Link = forwardRef<LinkElement, LinkProps>((props, ref) => {
  const { className, asChild, inverted, children, hideOpenIcon, ...linkProps } = extractProps(
    props,
    marginPropDefs,
    textTransformPropDefs
  );
  return (
    <Slot.Root
      ref={ref}
      className={cn(componentClassName, className)}
      data-inverted={inverted ? '' : undefined}
      data-testid={componentClassName}
      {...linkProps}
    >
      {asChild ? (
        children
      ) : (
        /* eslint-disable jsx-a11y/anchor-is-valid */
        <a>
          {children}
          {linkProps.target === '_blank' ? (
            <>
              <span data-visually-hidden>(opens in new tab)</span>
              {hideOpenIcon ? null : <OpenSmallIcon />}
            </>
          ) : null}
        </a>
      )}
    </Slot.Root>
  );
});

Link.displayName = COMPONENT_NAME;
