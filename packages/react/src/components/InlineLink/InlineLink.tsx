import * as React from 'react';

import clsx from 'clsx';

import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import type { InlineLinkProps } from './InlineLink.props';

const componentName = 'InlineLink';
const componentClassName = withGlobalPrefix(componentName);

type InlineLinkElement = ElementRef<'a'>;

export const InlineLink = React.forwardRef<InlineLinkElement, InlineLinkProps>(
  ({ className, inverted, children, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={clsx(componentClassName, className)}
        data-inverted={inverted ? '' : undefined}
        {...props}
      >
        {children}
      </a>
    );
  }
);

InlineLink.displayName = componentName;
