'use client';

import { ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Link } from '../Link/Link';
import type { LinkProps } from '../Link/Link.props';
import { Slot } from 'radix-ui';

const COMPONENT_NAME = 'AlertLink';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const AlertLink = (props: LinkProps) => {
  const { children, asChild, ...linkProps } = props;
  return (
    <Link
      className={clsx(componentClassName)}
      data-icon-only={children ? undefined : ''}
      asChild={asChild}
      {...linkProps}
    >
      {asChild ? <Slot.Slottable>{children}</Slot.Slottable> : children}
      <ChevronRightSmallIcon />
    </Link>
  );
};

AlertLink.displayName = COMPONENT_NAME;
