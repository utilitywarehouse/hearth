import * as React from 'react';

import clsx from 'clsx';

import { withClassnameGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import type { InlineLinkProps } from './InlineLink.props';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { textTransformPropDefs } from '../../props/text-transform.props';

const componentName = 'InlineLink';
const componentClassName = withClassnameGlobalPrefix(componentName);

type InlineLinkElement = ElementRef<'a'>;

export const InlineLink = React.forwardRef<InlineLinkElement, InlineLinkProps>((props, ref) => {
  const { className, inverted, children, ...inlineLinkProps } = extractProps(
    props,
    marginPropDefs,
    textTransformPropDefs
  );
  return (
    <a
      ref={ref}
      className={clsx(componentClassName, className)}
      data-inverted={inverted ? '' : undefined}
      {...inlineLinkProps}
    >
      {children}
    </a>
  );
});

InlineLink.displayName = componentName;
