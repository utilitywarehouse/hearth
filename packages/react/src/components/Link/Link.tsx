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
