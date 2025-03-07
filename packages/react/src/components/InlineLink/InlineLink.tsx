import * as React from 'react';

import clsx from 'clsx';

import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import type { InlineLinkProps } from './InlineLink.props';
import { DATA_ATTRIBUTES } from '../../helpers/data-attributes';

const componentName = 'InlineLink';
const componentClassName = withGlobalPrefix(componentName);

type InlineLinkElement = ElementRef<'a'>;

export const InlineLink = React.forwardRef<InlineLinkElement, InlineLinkProps>(
  ({ className, inverted, children, ...props }, ref) => {
    const dataAttributeProps = {
      [DATA_ATTRIBUTES.inverted]: inverted ? '' : undefined,
    };
    return (
      <a
        ref={ref}
        className={clsx(componentClassName, className)}
        {...props}
        {...dataAttributeProps}
      >
        {children}
      </a>
    );
  }
);

InlineLink.displayName = componentName;
