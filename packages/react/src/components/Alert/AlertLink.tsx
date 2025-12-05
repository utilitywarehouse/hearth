'use client';

import { ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import clsx from 'clsx';
import type { ElementRef } from 'react';
import * as React from 'react';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Link } from '../Link/Link';
import type { LinkProps } from '../Link/Link.props';
import { Slot } from 'radix-ui';

export type AlertLinkProps = LinkProps;

type AlertLinkElement = ElementRef<'a'>;

const COMPONENT_NAME = 'AlertLink';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const AlertLink = React.forwardRef<AlertLinkElement, AlertLinkProps>((props, ref) => {
  const { children, asChild, ...linkProps } = props;
  return (
    <Link
      ref={ref}
      className={clsx(componentClassName)}
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
