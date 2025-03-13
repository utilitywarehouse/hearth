import * as React from 'react';

import clsx from 'clsx';

import { Slot } from '@radix-ui/react-slot';

import type { LinkProps } from './Link.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import { DATA_ATTRIBUTES } from '../../helpers/data-attributes';

const componentName = 'Link';
const componentClassName = withGlobalPrefix(componentName);

type LinkElement = ElementRef<'a'>;

export const Link = React.forwardRef<LinkElement, LinkProps>(
  ({ className, asChild, inverted, children, ...linkProps }, ref) => {
    const dataAttributeProps = {
      [DATA_ATTRIBUTES.inverted]: inverted ? '' : undefined,
    };
    return (
      <Slot
        ref={ref}
        className={clsx(componentClassName, className)}
        {...linkProps}
        {...dataAttributeProps}
      >
        {asChild ? children : <a>{children}</a>}
      </Slot>
    );
  }
);

Link.displayName = componentName;
