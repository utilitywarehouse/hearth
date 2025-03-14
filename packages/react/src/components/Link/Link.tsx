import * as React from 'react';

import clsx from 'clsx';

import { Slot } from '@radix-ui/react-slot';

import type { LinkProps } from './Link.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';

const componentName = 'Link';
const componentClassName = withGlobalPrefix(componentName);

type LinkElement = ElementRef<'a'>;

export const Link = React.forwardRef<LinkElement, LinkProps>(
  ({ className, asChild, inverted, children, ...linkProps }, ref) => {
    return (
      <Slot
        ref={ref}
        className={clsx(componentClassName, className)}
        data-inverted={inverted ? '' : undefined}
        {...linkProps}
      >
        {asChild ? children : <a>{children}</a>}
      </Slot>
    );
  }
);

Link.displayName = componentName;
