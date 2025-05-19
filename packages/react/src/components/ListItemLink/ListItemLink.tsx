import * as React from 'react';
import clsx from 'clsx';
import type { ListItemLinkProps } from './ListItemLink.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import { ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { ListItemText } from '../ListItemText/ListItemText';

const componentName = 'ListItemLink';
const componentClassName = withGlobalPrefix(componentName);

type ListItemLinkElement = ElementRef<'a'>;

export const ListItemLink = React.forwardRef<ListItemLinkElement, ListItemLinkProps>(
  ({ className, children, helperText, leadingIcon, trailingIcon, ...props }, ref) => {
    return (
      <a ref={ref} className={clsx(componentClassName, className)} {...props}>
        <ListItemText helperText={helperText} leadingIcon={leadingIcon}>
          {children}
        </ListItemText>
        {trailingIcon ? trailingIcon : <ChevronRightSmallIcon />}
      </a>
    );
  }
);

ListItemLink.displayName = componentName;
