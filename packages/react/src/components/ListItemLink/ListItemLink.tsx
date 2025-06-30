import * as React from 'react';
import clsx from 'clsx';
import type { ListItemLinkProps } from './ListItemLink.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import { ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { ListItemContent } from '../ListItemContent/ListItemContent';

const componentName = 'ListItemLink';
const componentClassName = withGlobalPrefix(componentName);

type ListItemLinkElement = ElementRef<'a'>;

export const ListItemLink = React.forwardRef<ListItemLinkElement, ListItemLinkProps>(
  ({ className, heading, helperText, leadingIcon, trailingIcon, ...props }, ref) => {
    return (
      <a ref={ref} className={clsx(componentClassName, className)} {...props}>
        <ListItemContent heading={heading} helperText={helperText} leadingIcon={leadingIcon} />
        <div className="ListItemTrailingIcon">
          {trailingIcon ? trailingIcon : <ChevronRightSmallIcon />}
        </div>
      </a>
    );
  }
);

ListItemLink.displayName = componentName;
