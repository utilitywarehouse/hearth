'use client';

import * as React from 'react';
import { ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Link } from '../Link/Link';
import type { LinkProps } from '../Link/Link.props';
import { Slot } from 'radix-ui';
import type { ComponentRef } from 'react';

const COMPONENT_NAME = 'AlertLink';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type AlertLinkElement = ComponentRef<'a'>;

export const AlertLink = React.forwardRef<AlertLinkElement, LinkProps>((props, ref) => {
  const { children, asChild, ...linkProps } = props;
  return (
    <Link
      ref={ref}
      className={cn(componentClassName)}
      data-icon-only={children ? undefined : ''}
      asChild={asChild}
      {...linkProps}
    >
      {asChild ? <Slot.Slottable>{children}</Slot.Slottable> : children}
      <ChevronRightSmallIcon />
    </Link>
  );
});

AlertLink.displayName = COMPONENT_NAME;
