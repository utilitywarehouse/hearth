import * as React from 'react';
import clsx from 'clsx';
import type { ListItemButtonProps } from './ListItemButton.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import { ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { ListItemContent } from '../ListItemContent/ListItemContent';

const componentName = 'ListItemButton';
const componentClassName = withGlobalPrefix(componentName);

type ListItemButtonElement = ElementRef<'button'>;

export const ListItemButton = React.forwardRef<ListItemButtonElement, ListItemButtonProps>(
  ({ className, heading, helperText, leadingIcon, trailingIcon, ...props }, ref) => {
    return (
      <button ref={ref} className={clsx(componentClassName, className)} {...props}>
        <ListItemContent heading={heading} helperText={helperText} leadingIcon={leadingIcon} />
        <div className="hearth-ListItemTrailingIcon">
          {trailingIcon ? trailingIcon : <ChevronRightSmallIcon />}
        </div>
      </button>
    );
  }
);

ListItemButton.displayName = componentName;
