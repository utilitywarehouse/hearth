import * as React from 'react';
import clsx from 'clsx';
import type { ListItemButtonProps } from './ListItemButton.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import { ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { ListItemText } from '../ListItemText/ListItemText';

const componentName = 'ListItemButton';
const componentClassName = withGlobalPrefix(componentName);

type ListItemButtonElement = ElementRef<'button'>;

export const ListItemButton = React.forwardRef<ListItemButtonElement, ListItemButtonProps>(
  ({ className, children, helperText, leadingIcon, trailingIcon, ...props }, ref) => {
    return (
      <button ref={ref} className={clsx(componentClassName, className)} {...props}>
        <ListItemText helperText={helperText} leadingIcon={leadingIcon}>
          {children}
        </ListItemText>
        {trailingIcon ? trailingIcon : <ChevronRightSmallIcon />}
      </button>
    );
  }
);

ListItemButton.displayName = componentName;
