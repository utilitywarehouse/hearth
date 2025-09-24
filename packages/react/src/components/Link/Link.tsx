import * as React from 'react';
import clsx from 'clsx';
import { Slot } from 'radix-ui';
import type { LinkProps } from './Link.props';
import { withClassnameGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { textTransformPropDefs } from '../../props/text-transform.props';

const componentName = 'Link';
const componentClassName = withClassnameGlobalPrefix(componentName);

type LinkElement = ElementRef<'a'>;

export const Link = React.forwardRef<LinkElement, LinkProps>((props, ref) => {
  const { className, asChild, inverted, children, ...linkProps } = extractProps(
    props,
    marginPropDefs,
    textTransformPropDefs
  );
  return (
    <Slot.Root
      ref={ref}
      className={clsx(componentClassName, className)}
      data-inverted={inverted ? '' : undefined}
      {...linkProps}
    >
      {asChild ? children : <a>{children}</a>}
    </Slot.Root>
  );
});

Link.displayName = componentName;
