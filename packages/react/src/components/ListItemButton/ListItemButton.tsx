import * as React from 'react';
import clsx from 'clsx';
import type { ListItemButtonProps } from './ListItemButton.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import { ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { ListItemContent } from '../ListItemContent/ListItemContent';

const COMPONENT_NAME = 'ListItemButton';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type ListItemButtonElement = ElementRef<'button'>;

export const ListItemButton = React.forwardRef<ListItemButtonElement, ListItemButtonProps>(
  ({ className, heading, helperText, leadingContent, trailingContent, ...props }, ref) => {
    return (
      <button ref={ref} className={clsx(componentClassName, className)} {...props}>
        <ListItemContent
          heading={heading}
          helperText={helperText}
          leadingContent={leadingContent}
        />
        <div className="hearth-ListItemTrailingIcon">
          {trailingContent ? trailingContent : <ChevronRightSmallIcon />}
        </div>
      </button>
    );
  }
);

ListItemButton.displayName = COMPONENT_NAME;
