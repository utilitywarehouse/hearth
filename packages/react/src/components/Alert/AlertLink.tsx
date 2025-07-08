import { ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import clsx from 'clsx';
import type { ElementRef } from 'react';
import * as React from 'react';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Link } from '../Link/Link';
import type { LinkProps } from '../Link/Link.props';

export interface AlertLinkProps extends Omit<LinkProps, 'asChild'> {
  /**
   * The content of the link.
   */
  children?: React.ReactNode;
}

type AlertLinkElement = ElementRef<'a'>;

const componentName = 'AlertLink';
const componentClassName = withGlobalPrefix(componentName);

export const AlertLink = React.forwardRef<AlertLinkElement, AlertLinkProps>((props, ref) => {
  const { children, ...linkProps } = props;
  return (
    <Link
      ref={ref}
      className={clsx(componentClassName)}
      data-icon-only={children ? undefined : ''}
      {...linkProps}
    >
      {children}
      <ChevronRightSmallIcon />
    </Link>
  );
});

AlertLink.displayName = 'AlertLink';
