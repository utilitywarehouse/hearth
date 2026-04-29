'use client';

import { forwardRef } from 'react';
import { ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Link } from '../Link/Link';
import { Slot } from 'radix-ui';
import type { ComponentRef } from 'react';
import { AlertLinkProps } from './Alert.props';

const COMPONENT_NAME = 'AlertLink';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type AlertLinkElement = ComponentRef<'a'>;

export const AlertLink = forwardRef<AlertLinkElement, AlertLinkProps>((props, ref) => {
  const { children, asChild, ...linkProps } = props;
  return (
    <Link
      ref={ref}
      className={cn(componentClassName)}
      data-icon-only={children ? undefined : ''}
      asChild={asChild}
      hideOpenIcon
      {...linkProps}
    >
      {asChild ? <Slot.Slottable>{children}</Slot.Slottable> : children}
      <ChevronRightSmallIcon />
    </Link>
  );
});

AlertLink.displayName = COMPONENT_NAME;
