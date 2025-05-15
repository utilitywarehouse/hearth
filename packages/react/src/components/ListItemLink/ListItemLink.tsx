import * as React from 'react';
import clsx from 'clsx';
import type { ListItemLinkProps } from './ListItemLink.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import { ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-icons';

const componentName = 'ListItemLink';
const componentClassName = withGlobalPrefix(componentName);

type ListItemLinkElement = ElementRef<'a'>;

export const ListItemLink = React.forwardRef<ListItemLinkElement, ListItemLinkProps>(
  ({ className, children, trailingIcon, ...props }, ref) => {
    return (
      <a ref={ref} className={clsx(componentClassName, className)} {...props}>
        {children}
        <div className="hearth-trailing-icon">
          {trailingIcon ? trailingIcon : <ChevronRightSmallIcon />}
        </div>
      </a>
    );
  }
);

ListItemLink.displayName = componentName;
