import * as React from 'react';
import type { ElementRef } from 'react';
import clsx from 'clsx';

import { TableHeaderCellProps } from './TableHeaderCell.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { BodyText } from '../BodyText/BodyText';
import { ExpandSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { useTableHeaderContext } from '../TableHeader/TableHeader.context';

const COMPONENT_NAME = 'TableHeaderCell';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type TableHeaderCellElement = ElementRef<'th'>;

export const TableHeaderCell = React.forwardRef<TableHeaderCellElement, TableHeaderCellProps>(
  ({ className, children, sortable = false, sortKey, ...props }, ref) => {
    const { sortColumn, sortDirection: contextSortDirection, onSort } = useTableHeaderContext();

    // Determine if this column is currently sorted
    const isActiveColumn = sortKey && sortColumn === sortKey;
    const sortDirection = isActiveColumn ? (contextSortDirection ?? 'none') : 'none';

    const handleClick = () => {
      if (sortable && onSort && sortKey) {
        onSort(sortKey);
      }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTableCellElement>) => {
      if (sortable && onSort && sortKey && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        onSort(sortKey);
      }
    };

    return (
      <th
        ref={ref}
        className={clsx(componentClassName, className)}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role={sortable ? 'button' : undefined}
        tabIndex={sortable ? 0 : undefined}
        aria-sort={
          sortable
            ? sortDirection === 'asc'
              ? 'ascending'
              : sortDirection === 'desc'
                ? 'descending'
                : 'none'
            : undefined
        }
        data-sortable={sortable}
        {...props}
      >
        <div className={`${componentClassName}Content`}>
          <BodyText weight="semibold">{children}</BodyText>
          {sortable && (
            <ExpandSmallIcon
              className={`${componentClassName}SortIcon`}
              data-sort-direction={sortDirection}
            />
          )}
        </div>
      </th>
    );
  }
);

TableHeaderCell.displayName = COMPONENT_NAME;
